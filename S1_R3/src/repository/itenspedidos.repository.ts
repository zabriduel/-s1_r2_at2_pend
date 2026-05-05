import { db } from "../database/connetion.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";
import { IItensPedido } from "../models/itenspedido.model";

export class ItensPedidoRepository {
    async create(dados: Omit<IItensPedido, 'idItensPedido'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO itenspedidos (idPedido,idProduto,quantidade, valorTotal) VALUES (?,?,?,?);';
        const values = [dados._idPedido, dados._idProduto, dados._quantidade, dados._valorTotal];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
}