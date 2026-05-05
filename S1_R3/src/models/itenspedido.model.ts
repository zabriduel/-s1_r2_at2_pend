import { RowDataPacket } from "mysql2";

export interface IItensPedido extends RowDataPacket {
    idProduto?: number;
    idPedido?: number;
    quantidade?: number;
    valorTotal?: number;
    idItensPedidos?: number;
}

export class ItensPedido {
    private _idProduto?: number;
    private _idPedido?: number;
    private _quantidade?: number;
    private _valorTotal?: number = 0;
    private _idItensPedidos?: number = 0;


    constructor(idProduto: number, idPedido: number, quantidade: number, valorTotal?: number, idItensPedidos?: number) {
        this._idProduto = idProduto;
        this._idPedido = idPedido;
        this._quantidade = quantidade;
        this._valorTotal = valorTotal;
        this._idItensPedidos = idItensPedidos;
    }



    // GETTERS
    public get IdItensPedidos(): number | undefined {
        return this._idItensPedidos;
    }
    public get IdProduto(): number | undefined {
        return this._idProduto;
    }

    public get IdPedido(): number {
        return this._idPedido!;
    }

    public get Quantidade(): number {
        return this._quantidade!;
    }

    public get ValorTotal(): number {
        return this._valorTotal!;
    }


    // DP => Factory
    public static criar(idPedido: number, idProduto: number, quantidade: number, valorTotal: number): ItensPedido {
        return new ItensPedido(idProduto,idPedido, quantidade, valorTotal);
    }

    public static editar(idPedido: number, idProduto: number, quantidade: number, valorTotal: number, idItensPedidos: number) {
        return new ItensPedido(idPedido, idProduto, quantidade, valorTotal, idItensPedidos);
    }


    private _validarNumero(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error('Um valor númerico está incorreto');
        }
    }


}