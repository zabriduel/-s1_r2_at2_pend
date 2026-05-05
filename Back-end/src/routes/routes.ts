import { Router } from "express";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import pedidoRoutes from "./pedido.routes";

const router = Router();
router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', pedidoRoutes);

export default router;