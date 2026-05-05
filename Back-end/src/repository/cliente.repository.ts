import { db } from "../database/connetion.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";
import { Cliente } from "../models/cliente.model";

export class ClienteRepository {
    async findAll(): Promise<String[]> {
        const [rows] = await db.execute<RowDataPacket[]>('Select * FROM clientes;');
        
        return rows.map(row => {
            const cliente = new Cliente(row.nomeCliente, row.email, row.cpf, row.idCliente);
            return cliente.mostrarDados();
        });
    }
    async findById(id: number): Promise<String[]> {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?;';
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.map(row => {
            const cliente = new Cliente(row.nomeCliente, row.email, row.cpf, row.idCliente);
            return cliente.mostrarDados();
        });

    }
    async findByIdDefault(id: number): Promise<RowDataPacket[]> {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?;';
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows

    }

    async findByName(nomeCliente: string): Promise<String[]> {
        const sql = 'SELECT * FROM Clientes WHERE nomeCliente = ?';
        const values = [nomeCliente];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.map(row => {
            const cliente = new Cliente(row.nomeCliente, row.email, row.cpf, row.idCliente);
            return cliente.mostrarDados();
        });
    }

    async create(dados: Cliente): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO clientes (nomeCliente,cpf,email) VALUES (?,?,?);';
        const values = [dados.Nome, dados.Cpf, dados.Email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
    async update(id: number, dados: Omit<Cliente, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE clientes SET nomeCliente =?, email = ?, cpf = ? WHERE idCliente=? ;';
        const values = [dados.Nome, dados.Email, dados.Cpf, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);

        return rows
    }
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM clientes WHERE idCliente = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}