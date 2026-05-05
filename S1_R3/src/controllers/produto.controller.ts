import { ProdutoService } from "../services/produto.service";
import { Request, Response } from "express";
import path from "path";
import fs from 'fs';

export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }
    selecionar = async (req: Request, res: Response) => {
        try {
            // const id = Number(req.query.id);
            // const nomeProd = String(req.query.nomeProd);

            // if (id || isNaN(id)) {
            //     if (!id || isNaN(id)) {
            //         throw new Error('Valor para id deve ser um número válido.');
            //     }
            //     const produto = await this._service.selecionarPorId(id);
            //     if (produto.length === 0) {
            //         return res.status(200).json({ message: "Nenhum produto encontrado", produto });
            //     }
            //     return res.status(200).json({ produto });
            // } else if (nomeProd) {
            //     if (!nomeProd || nomeProd.trim().length < 3) {
            //         throw new Error('Nome do Produto deve ter pelo menos 3 caracteres');
            //     }
            //     if (nomeProd.trim().length > 100) {
            //         throw new Error('Nome do produto deve ter no máximo 100 caracteres')
            //     }
            //     const produto = await this._service.selecionarPorNome(nomeProd);

            //     if (produto.length === 0) {
            //         return res.status(200).json({ message: "Nenhum produto encontrado", produto });
            //     }
            //     return res.status(200).json({ produto });
            // } else {
            //     const produtos = await this._service.selecionarTodos();
            //     if (produtos.length === 0) {
            //         res.status(200).json({ message: "Nenhum produto encontrado", produtos });
            //     }
            //     return res.status(200).json({ produtos });
            // }
            const produtos = await this._service.selecionarTodos();
            if (produtos.length === 0) {
                return res.status(200).json({ message: "Nenhum produto encontrado", produtos });
            }
            return res.status(200).json({ produtos });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { nomeProd, valor } = req.body;
            const idCategoria = Number(req.body.idCategoria);
            console.log(nomeProd, valor, idCategoria);

            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não enviado' });
            }
            const image = req.file.filename;
            const categoria = await this._service.selecionarCategoria(idCategoria);
            if (categoria.length === 0 || isNaN(idCategoria)) {
                throw new Error('ID fornecido para categoria é inválido');
            }
            const resultado = await this._service.criar(nomeProd, valor, idCategoria, image);

            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir produto');
            }
            return res.status(201).json({ message: "Registro incluido com sucesso" });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }

            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    editar = async (req: Request, res: Response) => {
        try {
            const { nomeProd, valor } = req.body;
            const idProduto = Number(req.query.idProduto);
            const idCategoria = Number(req.query.idCategoria);
            if (!idProduto || isNaN(idProduto)) {
                throw new Error('Valor para ID produto inválido');
            }

            if (!nomeProd && !valor && !idCategoria) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamete' });
            }

            const produtoAtual = await this._service.selecionarPorId(idProduto);

            if (produtoAtual.length === 0) {
                return res.status(200).json({ message: "Produto não encontrado no banco de dados" })
            }


            const novoNome = nomeProd || produtoAtual[0].nomeProduto;
            const novoValor = valor || produtoAtual[0].valorProduto;
            const novaCategoria = idCategoria ?? produtoAtual[0].idCategoria ?? 0;
            let novoVinculoImagem: string;
            if (!req.file) {
                novoVinculoImagem = produtoAtual[0].vinculoImagem ?? "";
            } else {
                const imagePath = path.resolve(process.cwd(), `uploads/images/${produtoAtual[0].vinculoImagem}`);
                console.log(imagePath);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                novoVinculoImagem = req.file.filename;
            }

            const alterado = await this._service.editar(idProduto, novoNome, novoValor, novaCategoria, novoVinculoImagem);

            return res.status(200).json({ message: "Registro alterado com sucesso!", alterado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
    deletar = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.query.idProduto);
            if (!idProduto || isNaN(idProduto)) {
                throw new Error('Valor para id deve ser um número válido.');
            }

            const resultadoSelect = await this._service.selecionarPorId(idProduto);

            if (resultadoSelect.length === 0) {
                return res.status(200).json({ message: "Produto não encontrado no banco de dados" });
            }
            const imagePath = path.resolve(process.cwd(), `uploads/images/${resultadoSelect[0].vinculoImagem}`);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }


            const deletado = await this._service.deletar(idProduto);
            if (deletado.affectedRows === 0) {
                return res.status(200).json({ message: "Nenhum registro encontrado para ser deletado" });
            }
            return res.status(200).json({ message: "Registro deletado com sucesso", data: deletado });
        }
        catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });

        }
    }
}