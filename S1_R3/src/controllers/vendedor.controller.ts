import { VendedorService } from "../services/vendedor.service"; 
import { Request, Response } from "express";

export class VendedorController {
    constructor(private _service = new VendedorService()) { }

    selecionar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            const nomeVendedor = String(req.query.nomeVendedor);

            if (id || isNaN(id)) {
                if (!id || isNaN(id)) {
                    throw new Error('Valor para id deve ser um número válido.');
                }
                const vendedor = await this._service.selecionarPorId(id);
                if (vendedor.length === 0) {
                    return res.status(200).json({ message: "Nenhum vendedor encontrado", vendedor });
                }
                return res.status(200).json({ vendedor });
            } else if (nomeVendedor) {
                if (!nomeVendedor || nomeVendedor.trim().length < 3) {
                    throw new Error('Nome do vendedor deve ter pelo menos 3 caracteres');
                }
                if (nomeVendedor.trim().length > 100) {
                    throw new Error('Nome do vendedor deve ter no máximo 100 caracteres')
                }
                const vendedor = await this._service.selecionarPorNome(nomeVendedor);

                if (vendedor.length === 0) {
                    return res.status(200).json({ message: "Nenhum vendedor encontrado", vendedor });
                }
                return res.status(200).json({ vendedor });
            } else {
                const vendedores = await this._service.selecionarTodos();
                if (vendedores.length === 0) {
                    res.status(200).json({ message: "Nenhum vendedor encontrado", vendedores });
                }
                return res.status(200).json({ vendedores });
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { nomeVendedor, email, cpf } = req.body;

            const resultado = await this._service.criar(nomeVendedor, email, cpf);
            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir o vendedor');
            }
            return res.status(201).json({ message: "Registro incluido com sucesso" });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    editar = async (req: Request, res: Response) => {
        try {
            const { nomeVendedor, email, cpf } = req.body;
            const idVendedor = Number(req.query.idVendedor);

            if (!idVendedor || isNaN(idVendedor)) {
                throw new Error('Valor para ID produto inválido');
            }

            if (!nomeVendedor && !email && !cpf) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }
            const vendedorAtual = await this._service.selecionarPorIdPadrao(idVendedor);
            if (vendedorAtual.length === 0) {
                return res.status(200).json({ message: "Vendedor não encontrado no banco de dados" })
            }

            const novoNome = nomeVendedor || vendedorAtual[0].nomeVendedor;
            const novoEmail = email || vendedorAtual[0].email;
            const novoCpf = cpf || vendedorAtual[0].cpf;

            const alterado = await this._service.editar(idVendedor, novoNome, novoEmail, novoCpf);

            return res.status(200).json({ message: "Registro alterado com sucesso!", alterado });

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', erroeMessage: 'Erro desconhecido' });

        }
    }
    deletar = async (req: Request, res: Response) => {
        try {
            const idVendedor = Number(req.query.idVendedor);
            if (!idVendedor || isNaN(idVendedor)) {
                throw new Error('Valor para id deve ser um número válido.');
            }

            const resultadoSelect = await this._service.selecionarPorIdPadrao(idVendedor);
            if (resultadoSelect.length === 0) {
                return res.status(200).json({ message: "Vendedor não encontrado no banco de dados" });
            }
            const deletado = await this._service.deletar(idVendedor);
            if (deletado.affectedRows === 0) {
                return res.status(200).json({ message: "Nenhum registro encontrado para ser deletado" });
            }
            return res.status(200).json({ message: "Registro deletado com sucesso", data: deletado });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', erroeMessage: 'Erro desconhecido' });
        }
    }
}