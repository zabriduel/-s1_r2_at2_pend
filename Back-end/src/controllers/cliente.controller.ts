import { ClienteService } from "../services/cliente.services";
import { Request, Response } from "express";

export class ClienteController {
    constructor(private _service = new ClienteService()) { }

    selecionar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            const nomeCliente = String(req.query.nomeCliente);

            if (id || isNaN(id)) {
                if (!id || isNaN(id)) {
                    throw new Error('Valor para id deve ser um número válido.');
                }
                const cliente = await this._service.selecionarPorId(id);
                if (cliente.length === 0) {
                    return res.status(200).json({ message: "Nenhum cliente encontrado", cliente });
                }
                return res.status(200).json({ cliente });
            } else if (nomeCliente) {
                if (!nomeCliente || nomeCliente.trim().length < 3) {
                    throw new Error('Nome do cliente deve ter pelo menos 3 caracteres');
                }
                if (nomeCliente.trim().length > 100) {
                    throw new Error('Nome do cliente deve ter no máximo 100 caracteres')
                }
                const cliente = await this._service.selecionarPorNome(nomeCliente);

                if (cliente.length === 0) {
                    return res.status(200).json({ message: "Nenhum cliente encontrado", cliente });
                }
                return res.status(200).json({ cliente });
            } else {
                const clientes = await this._service.selecionarTodos();
                if (clientes.length === 0) {
                    res.status(200).json({ message: "Nenhum cliente encontrado", clientes });
                }
                return res.status(200).json({ clientes });
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
            const { nomeCliente, email, cpf } = req.body;
            const idCliente = Number(req.query.idCliente);

            if (!idCliente || isNaN(idCliente)) {
                throw new Error('Valor para ID produto inválido');
            }

            if (!nomeCliente && !email && !cpf) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }
            const clienteAtual = await this._service.selecionarPorIdPadrao(idCliente);
            if (clienteAtual.length === 0) {
                return res.status(200).json({ message: "Cliente não encontrado no banco de dados" })
            }

            const novoNome = nomeCliente || clienteAtual[0].nomeCliente;
            const novoEmail = email || clienteAtual[0].email;
            const novoCpf = cpf || clienteAtual[0].cpf;

            const alterado = await this._service.editar(idCliente, novoNome, novoEmail, novoCpf);

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
            const idCliente = Number(req.query.idCliente);
            if (!idCliente || isNaN(idCliente)) {
                throw new Error('Valor para id deve ser um número válido.');
            }

            const resultadoSelect = await this._service.selecionarPorIdPadrao(idCliente);
            if (resultadoSelect.length === 0) {
                return res.status(200).json({ message: "Cliente não encontrado no banco de dados" });
            }
            const deletado = await this._service.deletar(idCliente);
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