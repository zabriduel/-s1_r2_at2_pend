import { Pessoa } from "./pessoa.model"

export class Vendedor extends Pessoa {
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
    public static criar(nomeVendedor: string, emailVendedor: string, cpfVendedor: number) {
        return new Vendedor(nomeVendedor, emailVendedor, cpfVendedor);
    }
    public static editar(nomeVendedor: string, emailVendedor: string, cpfVendedor: number) {
        return new Vendedor(nomeVendedor, emailVendedor, cpfVendedor);
    }
}