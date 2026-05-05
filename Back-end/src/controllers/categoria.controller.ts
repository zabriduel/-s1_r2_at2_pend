import { CategoriaService } from "../services/categoria.service";
import { Request, Response } from "express";

export class CategoriaController {
  constructor(private _service = new CategoriaService()) {}
  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      const nomeCategoria = String(req.query.nomeCategoria);
      const categorias = await this._service.selecionarTodos();
      if (categorias.length === 0) {
        res
          .status(200)
          .json({ message: "Nenhuma categoria encontrada", categorias });
      }
      return res.status(200).json({ categorias });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message,
          });
      }
      return res
        .status(500)
        .json({
          message: "Ocorreu um erro no servidor",
          errorMessage: "Erro desconhecido",
        });
    }
  };
  criar = async (req: Request, res: Response) => {
    try {
      const { nomeCategoria } = req.body;
      const novo = await this._service.criar(nomeCategoria);

      res.status(201).json({ message: "Registro incluido com sucesso", novo });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message,
          });
      }
      return res
        .status(500)
        .json({
          message: "Ocorreu um erro no servidor",
          errorMessage: "Erro desconhecido",
        });
    }
  };
  editar = async (req: Request, res: Response) => {
    try {
      const { nomeCategoria } = req.body;
      const id = Number(req.query.id);
      if (!id || isNaN(id)) {
        throw new Error("Valor para id deve ser um número válido.");
      }
      const alterado = await this._service.editar(id, nomeCategoria);
      return res
        .status(200)
        .json({ message: "Registro alterado com sucesso!", alterado });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message,
          });
      }
      return res
        .status(500)
        .json({
          message: "Ocorreu um erro no servidor",
          errorMessage: "Erro desconhecido",
        });
    }
  };
  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      if (!id || isNaN(id)) {
        throw new Error("Valor para id deve ser um número válido.");
      }
      const deletado = await this._service.deletar(id);
      if (deletado.affectedRows === 0) {
        return res
          .status(200)
          .json({ message: "Nenhum registro encontrado para ser deletado" });
      }
      return res
        .status(200)
        .json({ message: "Registro deletado com sucesso", data: deletado });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message,
          });
      }
      return res
        .status(500)
        .json({
          message: "Ocorreu um erro no servidor",
          errorMessage: "Erro desconhecido",
        });
    }
  };
}
