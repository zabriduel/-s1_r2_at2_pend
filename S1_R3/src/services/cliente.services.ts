import { Cliente } from "../models/cliente.model";
import { ClienteRepository } from "../repository/cliente.repository";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }
    async selecionarPorId(id: number) {
        return await this._repository.findById(id);
    }
    async selecionarPorIdPadrao(id: number) {
        return await this._repository.findByIdDefault(id);
    }

    async selecionarPorNome(nomeCliente: string) {
        return await this._repository.findByName(nomeCliente);
    }
    async criar(nomeCliente: string, email: string, cpf: number) {
        const cliente = Cliente.criar(nomeCliente, email, cpf);

        return await this._repository.create(cliente);
    }
    async editar(id: number, nomeCliente: string, email: string, cpf: number) {
        const cliente = Cliente.editar(nomeCliente, email, cpf);
        return await this._repository.update(id, cliente);
    }
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}