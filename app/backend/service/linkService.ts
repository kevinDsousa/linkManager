import { linkRepository } from '../repository/linksRepository'
import randomstring from "randomstring";

const buscar = async (): Promise<void> => {
    await linkRepository.buscar();
  };

const criar = async (link: any): Promise<void> => {
  if(!link) {
    throw new Error("Url obrigatória")
  }
  link.code = randomstring.generate(5);
  
  const resposta = await linkRepository.criar(link);

  return resposta;
}

const buscarPeloCode = async (code: string) => {
  const resposta = await linkRepository.buscaPorCode(code);

  return resposta;
}

const atualizarPorId = async (id: string) => {
  const resposta = await linkRepository.atualizarPorId(+id);

  return resposta;
}

const deletarPorId = async (id: string) => {
  const resposta = await linkRepository.deletarPorId(+id);

  return resposta;
}

export const linkService = { buscar, criar, buscarPeloCode, atualizarPorId, deletarPorId};
