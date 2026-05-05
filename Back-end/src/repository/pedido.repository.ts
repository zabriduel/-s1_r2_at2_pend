import { db } from "../database/connetion.database";
import { IPedido } from "../models/pedido.models";
import { ResultSetHeader } from "mysql2";

export class PedidoRepository {
    async findALL(): Promise<IPedido[]> {
        const [rows] = await db.execute<IPedido[]>(
            'SELECT * FROM pedidos;'
        )
        return rows;
    }

    async findById(id: number): Promise<IPedido[]> {
        const sql = 'SELECT * FROM pedidos WHERE idPedido = ?;';
        const values = [id];
        const [rows] = await db.execute<IPedido[]>(sql, values);
        return rows;

    }
    // Omit => Omite os campos discriminados
    async create(dados: Omit<IPedido, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO pedidos (valorPedido,idVendedor,idCliente) VALUES (?,?,?);';
        const values = [dados._valorPedido, dados._idVendedor, dados._idCliente,];
        console.log(values);
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }

    async updateItens(valor: number, idPedido:number): Promise<ResultSetHeader> {
        const sql = 'UPDATE pedidos SET valorPedido = ? WHERE idPedido =? ;';

        const values = [valor, idPedido];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        console.log(rows);

        return rows
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const deleteItens = 'DELETE FROM itenspedidos WHERE idPedido =?;';
        const values = [id];
        await db.execute<ResultSetHeader>(deleteItens, values);
        const sql = 'DELETE FROM pedidos WHERE idPedido = ?';
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}