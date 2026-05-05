import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionar);
produtoRoutes.post('/produtos', uploadImage, produtoController.criar);
produtoRoutes.patch('/produtos', uploadImage, produtoController.editar);
produtoRoutes.delete('/produtos', produtoController.deletar);


export default produtoRoutes;







