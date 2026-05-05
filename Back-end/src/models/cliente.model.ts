import { Pessoa } from "./pessoa.model"

export class Cliente extends Pessoa {
    private _id?: number;
    constructor(nome: string, email: string, cpf: number, id?: number) {
        super(nome, email, cpf);
        this._id = id;
    };

    public get Id(): number | undefined {
        return this._id;
    }

    public mostrarDados(): string {
        return `id: ${this._id}, ${super.mostrarDados()}`;
    }
    public static criar(nomeCliente: string, emailCliente: string, cpfCliente: number) {
        return new Cliente(nomeCliente, emailCliente, cpfCliente);
    }
    public static editar(nomeCliente: string, emailCliente: string, cpfCliente: number) {
        return new Cliente(nomeCliente, emailCliente, cpfCliente);
    }
}