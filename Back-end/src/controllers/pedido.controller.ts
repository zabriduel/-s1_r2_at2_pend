import { PedidoService } from "../services/pedido.service";
import { ClienteService } from "../services/cliente.services";
import { Vendedor } from "../models/vendedor.model";
import { Request, Response } from "express";

export class PedidoController {
    constructor(private _service = new PedidoService()) { }
    selecionar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (id || isNaN(id)) {
                if (!id || isNaN(id)) {
                    throw new Error('Valor para id deve ser um número válido.');
                }
                const pedido = await this._service.selecionarPorId(id);
                if (pedido.length === 0) {
                    return res.status(200).json({ message: "Nenhum pedido encontrada", pedido });
                }
                return res.status(200).json({ pedido });
            } else {
                const pedidos = await this._service.selecionarTodos();
                if (pedidos.length === 0) {
                    res.status(200).json({ message: "Nenhum pedido encontrado", pedidos });
                }
                return res.status(200).json({ pedidos });
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const idCliente = Number(req.query.idCliente);
            const idVendedor = Number(req.query.idVendedor);
            const { valorPedido, itensPedido } = req.body;

            const resultado = await this._service.criar(valorPedido, idVendedor, idCliente, itensPedido);

            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir produto');
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
    adcionarItem = async (req: Request, res: Response) => {
        try {
            const idPedido = Number(req.query.idPedido);
            const { idProduto, quantidade } = req.body

            const resultado = await this._service.adicionarItens(idProduto, idPedido, quantidade);

            if (resultado.affectedRows === 0) {
                throw new Error('Ocorreu um erro ao incluir item');
            }
            return res.status(201).json({ message: "Registro alterado com sucesso" });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }

            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    deletar = async (req: Request, res: Response) => {
        try {
            const idPedido = Number(req.query.idPedido);
            if (!idPedido || isNaN(idPedido)) {
                throw new Error('Valor para id deve ser um número válido.');
            }

            const resultadoSelect = await this._service.selecionarPorId(idPedido);

            if (resultadoSelect.length === 0) {
                return res.status(200).json({ message: "Pedido não encontrado no banco de dados" });
            }

            const deletado = await this._service.deletar(idPedido);
            if (deletado.affectedRows === 0) {
                return res.status(200).json({ message: "Nenhum registro encontrado para ser deletado" });
            }
            return res.status(200).json({ message: "Registro deletado com sucesso", data: deletado });
        }
        catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });

        }
    }
}