import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

export class ClienteController extends Cliente {

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
            const listaDeClientes = await Cliente.listagemClientes();

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
                                            clienteRecebido.cpf, 
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
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            //recuperar o ID do cliente a ser removido
            const IdCliente = parseInt(req.params.idCliente as string);

            //chamar a função do modelo e armazenar a resposta
            const respostaModelo = await Cliente.removerCliente(IdCliente);

            //verifica se a resposta do modelo foi verdadeiro (true)
            if (respostaModelo) {
                //retorna um status 200 c0m uma mensagem de sucesso
                return res.status(200).json({ mensagem: "O cliente foi removido com sucesso!" })
            } else {
                //retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o cliente. Entre em contato com o administrador do sistema" })
            }

        } catch (error) {
            //lança uma mensagem de erro no console
            console.log(`Erro ao remover um cliente. ${error}`);

            //retorna uma mensagem de erro à quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o carro. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const clienteRecebido: ClienteDTO = req.body;
            const idClienteRecebido = parseInt(req.params.idCliente as string);
            const clienteAtualizado = new Cliente(
                clienteRecebido.nome,
                clienteRecebido.cpf,
                clienteRecebido.telefone
            );
    
            clienteAtualizado.setIdCliente(idClienteRecebido);
            const respostaModelo = await Cliente.atualizarCliente(clienteAtualizado);
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o cliente. Entre em contato com o administrador do sistema" });
            }
        } catch (error) {
            console.log(`Erro ao atualizar um cliente ${error}`);
    
            return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema" });
        }
    }
}
