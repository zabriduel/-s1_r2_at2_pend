import { db } from "../database/connetion.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";
import { Vendedor } from "../models/vendedor.model";

export class VendedorRepository {
    async findAll(): Promise<String[]> {
        const [rows] = await db.execute<RowDataPacket[]>('Select * FROM vendedores;');

        return rows.map(row => {
            const vendedor = new Vendedor(row.nomeVendedor, row.email, row.cpf, row.idVendedor);
            return vendedor.mostrarDados();
        });
    }
    async findById(id: number): Promise<String[]> {
        const sql = 'SELECT * FROM vendedores WHERE idVendedor = ?;';
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.map(row => {
            const vendedor = new Vendedor(row.nomeVendedor, row.email, row.cpf, row.idVendedor);
            return vendedor.mostrarDados();
        });

    }
    async findByIdDefault(id: number): Promise<RowDataPacket[]> {
        const sql = 'SELECT * FROM vendedores WHERE idVendedor = ?;';
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows

    }

    async findByName(nomeCliente: string): Promise<String[]> {
        const sql = 'SELECT * FROM vendedores WHERE nomeVendedor = ?';
        const values = [nomeCliente];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.map(row => {
            const vendedor = new Vendedor(row.nomeVendedor, row.email, row.cpf, row.idVendedor);
            return vendedor.mostrarDados();
        });
    }

    async create(dados: Vendedor): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO vendedores (nomeVendedor,cpf,email) VALUES (?,?,?);';
        const values = [dados.Nome, dados.Cpf, dados.Email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
    async update(id: number, dados: Omit<Vendedor, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE vendedores SET nomeVendedor =?, email = ?, cpf = ? WHERE idVendedor=? ;';
        const values = [dados.Nome, dados.Email, dados.Cpf, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM vendedores WHERE idVendedor = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}