export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
    protected _nome: string = '';
    protected _email: string = '';
    protected _cpf: number = 0;

    constructor(nome: string, email: string, cpf: number) {
        this.Nome = nome;
        this.Email = email;
        this.Cpf = cpf;
    }
    mostrarDados(): string {
        return `Nome: ${this._nome}, Email: ${this._email}, CPF: ${this._cpf} `;
    };

    public get Nome(): string {
        return this._nome;
    }
    public get Email(): string {
        return this._email;
    }
    public get Cpf(): number {
        return this._cpf;
    }

    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }
    private set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }
    private set Cpf(value: number) {
        this._validarCpf(value);
        this._cpf = value;
    }


    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome do cadastro deve ter pelo menos 3 caracteres');
        } else if (value.trim().length > 100) {
            throw new Error('Nome do cadastro deve ter no máximo 100 caracteres');
        }
    }
    private _validarEmail(value: string): void {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!value || !regex.test(value)) {
            throw new Error("Email inválido");
        }
    }
    private _validarCpf(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error("CPF inválido");
        } else if (value.toString().length > 11) {
            throw new Error('CPF deve ter no máximo 11');
        }
    }
}
