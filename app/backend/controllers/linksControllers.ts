import { Request, Response } from 'express';
import { linkService } from '../service/linkService'

const buscar = async (req: Request, res: Response): Promise<void> => {
    return await linkService.buscar()
};

const cadastrar = async (req: Request, res: Response): Promise<void> => {
    const link = req.body
    return await linkService.criar(link)
}

const buscarPeloCode = async (req: Request, res: Response): Promise<void> => {
    return await linkService.buscarPeloCode(req.params.code);
}

const atualizarPorId = async (req: Request, res: Response): Promise<void> => {
    return await linkService.atualizarPorId(req.params.id);
}

const deletarPeloId = async (req: Request, res: Response): Promise<void> => {
    return await linkService.deletarPorId(req.params.id);

}

export const linksController = { buscar, cadastrar, buscarPeloCode, atualizarPorId, deletarPeloId };
