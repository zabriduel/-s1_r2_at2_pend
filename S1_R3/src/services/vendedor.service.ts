import { Vendedor } from "../models/vendedor.model";
import { VendedorRepository } from "../repository/vendedor.repository";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }
    async selecionarPorIdPadrao(id: number) {
        return await this._repository.findByIdDefault(id);
    }

    async selecionarPorNome(nomeVendedor: string) {
        return await this._repository.findByName(nomeVendedor);
    }
    async criar(nomeVendedor: string, email: string, cpf: number) {
        const vendedor = Vendedor.criar(nomeVendedor, email, cpf);

        return await this._repository.create(vendedor);
    }
    async editar(id: number, nomeVendedor: string, email: string, cpf: number) {
        const vendedor = Vendedor.editar(nomeVendedor, email, cpf);
        return await this._repository.update(id, vendedor);
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}