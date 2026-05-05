import { PedidoRepository } from "../repository/pedido.repository";
import { Pedido } from "../models/pedido.models";
import { ItensPedidoRepository } from "../repository/itenspedidos.repository";
import { ItensPedido } from "../models/itenspedido.model";
import { ProdutoRepository } from "../repository/produto.repository";

export class PedidoService {
    constructor(private _repository = new PedidoRepository(), private _produtos = new ProdutoRepository(), private _itensPedido = new ItensPedidoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findALL();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }
    async criar(valorPedido: number, idVendedor: number, idCliente: number, itensPedido: object) {

        const pedido = Pedido.criar(valorPedido, idVendedor, idCliente);


        return await this._repository.create(pedido)
    }
    async adicionarItens(idProduto: number, idPedido: number, quantidade: number) {
        const consultaItens = await this._produtos.findById(idProduto);
        const total = consultaItens[0].valorProduto * quantidade;
        const item = ItensPedido.criar(idPedido, idProduto, quantidade, total);

        const novoItem = await this._itensPedido.create(item);

        const consultaPedido = await this._repository.findById(idPedido);

        const valorFinal = Number(consultaPedido[0].valorPedido) + Number(total);
        const pedidoAtualizado = await this._repository.updateItens(Number(valorFinal), idPedido);
        return pedidoAtualizado;
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}