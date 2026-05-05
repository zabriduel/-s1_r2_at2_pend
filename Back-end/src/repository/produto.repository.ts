import { db } from "../database/connetion.database";
import { IProduto } from "../models/produto.model";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoRepository {
  async findALL(): Promise<IProduto[]> {
    const [rows] = await db.execute<IProduto[]>(
      "SELECT  p.idProduto, p.nomeProduto, p.valorProduto, p.vinculoImagem, c.nomeCategoria AS nomeCategoria FROM produtos p JOIN categorias c ON p.idCategoria = c.idCategoria;"
    );
    return rows;
  }

  async findById(id: number): Promise<IProduto[]> {
    const sql = "SELECT * FROM produtos WHERE idProduto = ?;";
    const values = [id];
    const [rows] = await db.execute<IProduto[]>(sql, values);
    return rows;
  }
  async findByName(nomeProd: string): Promise<IProduto[]> {
    const sql = "SELECT * FROM produtos WHERE nomeProduto = ?";
    const values = [nomeProd];
    const [rows] = await db.execute<IProduto[]>(sql, values);
    return rows;
  }
  async findCatById(id: number): Promise<ICategoria[]> {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ?;";
    const values = [id];
    const [rows] = await db.execute<ICategoria[]>(sql, values);
    return rows;
  }
  // Omit => Omite os campos discriminados
  async create(dados: Omit<IProduto, "id">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO produtos (nomeProduto, valorProduto,vinculoImagem,idCategoria) VALUES (?,?,?,?);";
    const values = [
      dados._nomeProd,
      dados._valor,
      dados._vinculoImagem,
      dados._idCategoria,
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
  async update(
    id: number,
    dados: Omit<IProduto, "id">,
  ): Promise<ResultSetHeader> {
    const sql =
      "UPDATE produtos SET nomeProduto =?, valorProduto=?, idCategoria=?, vinculoImagem = ? WHERE idProduto=? ;";
    const values = [
      dados._nomeProd,
      dados._valor,
      dados._idCategoria,
      dados._vinculoImagem,
      id,
    ];

    const [rows] = await db.execute<ResultSetHeader>(sql, values);

    return rows;
  }
  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM produtos WHERE idProduto = ?";
    const values = [id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}
