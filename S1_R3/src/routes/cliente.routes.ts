import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteController = new ClienteController();
const clienteRoutes = Router();

clienteRoutes.get('/clientes',clienteController.selecionar);
clienteRoutes.post('/clientes',clienteController.criar);
clienteRoutes.patch('/clientes',clienteController.editar);
clienteRoutes.delete('/clientes',clienteController.deletar);

export default clienteRoutes;