import { RowDataPacket } from "mysql2";

export interface IPedido extends RowDataPacket {
    idPedido?: number;
    valorPedido?: number;
    idVendedor?: number;
    idCliente?: number;
    dataPedido?: Date;
}

export class Pedido {
    private _idPedido?: number;
    private _valorPedido?: number;
    private _idVendedor?: number;
    private _idCliente?: number;
    private _dataPedido?: Date;


    constructor(valorPedido: number, idVendedor: number, idCliente: number, idPedido?: number) {
        this.ValorPedido = valorPedido;
        this._idVendedor = idVendedor;
        this._idCliente = idCliente;
        this._idPedido = idPedido;
    }



    // GETTERS
    public get ValorPedido(): number {
        return this._valorPedido!; // ✅
    }

    public get IdVendedor(): number {
        return this._idVendedor!; // ✅
    }

    public get IdCliente(): number {
        return this._idCliente!; // ✅
    }
    public get DataCad(): Date | undefined {
        return this._dataPedido;
    }
    // SETTERS

    public set ValorPedido(value: number) {
        this._validarNumero(value);
        this._valorPedido = value;
    }


    // DP => Factory


    public static criar(valorPedido: number, idVendedor: number, idCliente: number): Pedido {
        return new Pedido(valorPedido, idVendedor, idCliente);
    }

    public static editar(idPedido: number, valorPedido: number, idVendedor: number, idCliente: number) {
        return new Pedido(valorPedido, idVendedor, idCliente, idPedido);
    }


    private _validarNumero(value: number): void {
        if (!value || isNaN(value)) {
            throw new Error('Um valor númerico está incorreto');
        }
    }


}