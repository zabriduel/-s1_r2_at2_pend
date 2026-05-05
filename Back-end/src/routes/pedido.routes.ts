import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const pedidoController = new PedidoController();
const pedidoRoutes = Router();

pedidoRoutes.get('/pedidos', pedidoController.selecionar);
pedidoRoutes.post('/pedidos', pedidoController.criar);
pedidoRoutes.post('/pedidos/itens', pedidoController.adcionarItem);
// pedidoRoutes.patch('/pedidos', pedidoController.editar);
pedidoRoutes.delete('/pedidos', pedidoController.deletar);


export default pedidoRoutes;







