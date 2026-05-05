import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionar);
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias', categoriaController.editar);
categoriaRoutes.delete('/categorias', categoriaController.deletar);

export default categoriaRoutes;