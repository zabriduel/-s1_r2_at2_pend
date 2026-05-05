import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    idProduto?: number;
    nomeProduto?: string;
    valor?: number;
    vinculoImagem?: string;
    idCategoria?: number;
}

export class Produto {
    private _idProduto?: number;
    private _nomeProd: string = '';
    private _valor: number = 0;
    private _vinculoImagem: string;
    private _idCategoria: number = 0;


    constructor(nomeProd: string, valor: number, vinculoImagem: string, idCategoria: number, idProduto?: number) {
        this.NomeProd = nomeProd;
        this.Valor = valor;
        this._vinculoImagem = vinculoImagem;
        this.IdCategoria = idCategoria;
        this._idProduto = idProduto;
    }

    // GETTERS
    public get IdProduto(): number | undefined {
        return this._idProduto;
    }

    public get NomeProd(): string {
        return this._nomeProd;
    }

    public get VinculoImage(): string {
        return this._vinculoImagem;
    }

    public get Valor(): number {
        return this._valor;
    }

    public get IdCategoria(): number {
        return this._idCategoria;
    }


    // SETTERS
    public set NomeProd(value: string) {
        this._validarNomeProd(value);
        this._nomeProd = value;
    }
    public set IdCategoria(value: number) {
        this._validarNumero(value);
        this._idCategoria = value;
    }
    public set Valor(value: number) {
        this._validarNumero(value);
        this._valor = value;
    }


    public set IdProduto(value: number) {
        this._idProduto = value;
    }

    // DP => Factory


    public static criar(nomeProduto: string, valor: number, idCategoria: number, vinculoImagem: string): Produto {
        return new Produto(nomeProduto, valor, vinculoImagem, idCategoria);
    }

    public static editar(idProduto: number,nomeProd: string, valor: number, idCategoria: number, vinculoImagem: string ) {
        return new Produto(nomeProd, valor, vinculoImagem, idCategoria, idProduto);
    }


    private _validarNomeProd(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome do produto deve ter pelo menos 3 caracteres');
        }

        if (value.trim().length > 100) {
            throw new Error('Nome do produto deve ter no máximo 100 caracteres')
        }
    }

    private _validarNumero(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error('Um valor númerico está incorreto');
        }
    }

}