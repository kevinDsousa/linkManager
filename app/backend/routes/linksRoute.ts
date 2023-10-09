import express from 'express'
import { linksController } from '../controllers/linksControllers'

export const linksRoute = express.Router();

linksRoute.get("/", linksController.buscar);
linksRoute.post("/", linksController.cadastrar);
linksRoute.get("/:code", linksController.buscarPeloCode);
linksRoute.patch("/:id", linksController.atualizarPorId);
linksRoute.delete("/:id", linksController.deletarPeloId);
