import express from 'express';
import cors from 'cors';
import { router } from './routes';

// Cria o servidor express
 const server = express();
// Configura o servidor para aceitar requisições de outros dominios
server.use(cors());
// Configura o servidor para aceitar requisições no formato JSON
server.use(express.json());

// Configura o servidor para usar as rotas
server.use(router);

// Exporta o servidor 
export { server };