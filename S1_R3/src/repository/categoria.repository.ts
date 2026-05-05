import { db } from "../database/connetion.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2";

export class CategoriaRepository {
    async findAll(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM categorias;'
        );

        return rows;
    }
    async findById(id: number): Promise<ICategoria[]> {
        const sql = 'SELECT * FROM categorias WHERE idCategoria = ?;';
        const values = [id];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;

    }
    async findByName(nomeCategoria: string): Promise<ICategoria[]> {
        const sql = 'SELECT * FROM categorias WHERE nomeCategoria = ?';
        const values = [nomeCategoria];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;
    }

    // Omit => Omite os campos discriminados
    async create(dados: Omit<ICategoria, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO categorias (nomeCategoria) VALUES (?);';
        const values = [dados._nomeCategoria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows
    }
    async update(id: number, dados: Omit<ICategoria, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE categorias SET nomeCategoria =? WHERE idCategoria=? ;';
        const values = [dados._nomeCategoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        console.log(rows);

        return rows
    }
    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM categorias WHERE idCategoria = ?';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}