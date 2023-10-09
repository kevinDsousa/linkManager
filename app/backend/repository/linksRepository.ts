import { PrismaClient } from '@prisma/client'
import { LinksEntity } from "../entities/links.entity";

const prisma = new PrismaClient()

// const { Pool } = require("pg");

// const config = {
//   host: process.env.HOSTDB_DEV,
//   port: process.env.POSTGRESURL,
//   user: process.env.USERDB_DEV,
//   password: process.env.PASSWORDDB_DEV,
//   database: process.env.DATABASE_DEV,
// };

// const pool = new Pool(config);

const buscar = async (): Promise<LinksEntity[]> => {
  return await prisma.links.findMany();
};

const criar = async (link: any) => {
  
}

const buscaPorCode = async (code: string) => {
  
}

const atualizarPorId = async (id: number) => {
  
}

const deletarPorId = async (id: number) => {
  
}

export const linkRepository = { buscar, criar, buscaPorCode, deletarPorId, atualizarPorId };
