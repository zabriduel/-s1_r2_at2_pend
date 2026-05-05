import { CategoriaRepository } from "../repository/categoria.repository";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {
    constructor(private _repository = new CategoriaRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }

    async selecionarPorDescricao(nomeCategoria: string) {
        return await this._repository.findByName(nomeCategoria);
    }

    async criar(nomeCategoria: string) {
        const categoria = Categoria.criar(nomeCategoria);

        return await this._repository.create(categoria);
    }

    async editar(id: number, nomeCategoria: string) {
        const categoria = Categoria.editar(nomeCategoria, id);
        return await this._repository.update(id, categoria);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}