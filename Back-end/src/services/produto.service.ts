import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findALL();
    }

    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async selecionarPorNome(nomeProd: string) {
        return await this._repository.findByName(nomeProd);
    }
    async selecionarCategoria(id: number) {
        return await this._repository.findCatById(id);
    }

    async criar(nomeProd: string, valor: number, idCategoria: number, vinculoImagem: string) {
        const produto = Produto.criar(nomeProd, valor, idCategoria, vinculoImagem);

        return await this._repository.create(produto);
    }

    async editar(idProduto: number, nomeProd: string, valor: number, idCategoria: number, vinculoImagem: string) {
        
        const produto = Produto.editar(idProduto,nomeProd, valor, idCategoria,vinculoImagem );

        return await this._repository.update(idProduto, produto);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }

}