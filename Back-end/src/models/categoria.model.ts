import { RowDataPacket } from "mysql2";

export interface ICategoria extends RowDataPacket {
    id?: number,
    nomeCategoria?: string;
    dataCad?: Date;
}

export class Categoria {
    private _id?: number;
    private _nomeCategoria: string = '';
    private _dataCad?: Date;

    constructor(nomeCategoria: string, id?: number) {
        this.NomeCat = nomeCategoria;
        this._id = id;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id;
    }
    public get NomeCat(): string {
        return this._nomeCategoria;
    }
    public get DataCad(): Date | undefined {
        return this._dataCad;
    }

    // Setters
    public set NomeCat(value: string) {
        this._validarNome(value);
        this._nomeCategoria = value;
    }

    public set Id(value: number) {
        this._id = value;
    }

    // DP => Factory

    public static criar(nomeCategoria: string): Categoria {
        return new Categoria(nomeCategoria);
    }

    public static editar(nomeCategoria: string, id: number) {
        return new Categoria(nomeCategoria, id);
    }
    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome da categoria deve ter pelo menos 3 caracteres');
        }

        if (value.trim().length > 50) {
            throw new Error('Nome da categoria deve ter no máximo 50   caracteres')
        }
    }

}