import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    email: string,
    telefone: string
}

class ClienteController extends Cliente {

    /**
     * Método para listar todos os clientes.
     * 
     * Recupera uma lista de clientes do banco de dados e retorna como resposta.
     * Em caso de erro, retorna uma mensagem de erro com status 400.
     * 
     * @param {Request} req - Requisição HTTP
     * @param {Response} res - Resposta HTTP
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaDeClientes = await Cliente.listarCliente();

            return res.status(200).json(listaDeClientes);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            return res.status(400).json("Erro ao recuperar as informações dos clientes");
        }
    }

    /**
     * Método para cadastrar um novo cliente.
     * 
     * Recebe os dados do cliente no corpo da requisição e tenta cadastrar no banco de dados.
     * Caso o cadastro seja bem-sucedido, retorna uma resposta com status 200.
     * Em caso de erro, retorna status 400 e uma mensagem explicativa.
     * 
     * @param {Request} req - Requisição HTTP contendo os dados do cliente
     * @param {Response} res - Resposta HTTP
     * @returns {Promise<Response>} - Resposta HTTP indicando sucesso ou falha do cadastro
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface ClienteDTO
            const clienteRecebido: ClienteDTO = req.body;

            // Instanciando um novo cliente com as informações recebidas
            const novoCliente = new Cliente(clienteRecebido.nome, 
                                            clienteRecebido.email, 
                                            clienteRecebido.telefone);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Cliente.cadastroCliente(novoCliente);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o cliente. Entre em contato com o administrador do sistema." });
            }

        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um cliente. ${error}`);

            // Retorna uma mensagem de erro ao cliente
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
}

export default ClienteController;
