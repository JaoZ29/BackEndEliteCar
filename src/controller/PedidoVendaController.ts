import { Request, Response } from 'express';
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCliente: number,
    idCarro: number,
    dataPedido: Date,
    valorPedido: number
}

// Definindo a classe PedidoVendaController que herda da classe PedidoVenda
class PedidoVendaController extends PedidoVenda {

    // Método estático 'todos' que responde a uma requisição para listar todos os pedidos de venda
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método 'listarPedidos' da classe 'PedidoVenda' para obter a lista de pedidos
            const listaDePedidos = await PedidoVenda.listarPedidos();

            // Retorna a lista de pedidos em formato JSON com o status HTTP 200 (OK)
            res.status(200).json(listaDePedidos);
            // Em caso de erro, exibe uma mensagem no console e retorna um erro 400 (Bad Request) com uma mensagem
        } catch (error) {
            console.log(`Erro ao acessar o método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações");
        }
    }

    /**
       * Método controller para cadastrar um novo Pedido de Venda.
       * 
       * Esta função recebe uma requisição HTTP contendo os dados de um Pedido de Venda no corpo da requisição
       * e tenta cadastrar este Pedido de Venda no banco de dados utilizando a função `cadastroPedidoVenda`. Caso o cadastro 
       * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
       * uma resposta HTTP 400 com uma mensagem de erro.
       * 
       * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do Pedido de Venda no formato `PedidoVendaDTO`.
       * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao Pedido de Venda.
       * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
       * 
       * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
       *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
       */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoVendaDTO
            const pedidoRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo PedidoVenda com as informações recebidas
            const novoPedido = new PedidoVenda(pedidoRecebido.idCliente,
                pedidoRecebido.idCarro,
                pedidoRecebido.dataPedido,
                pedidoRecebido.valorPedido);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedido(novoPedido);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido de Venda cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Pedido de Venda. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." });
        }
    }
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            //recuperar o ID do cliente a ser removido
            const IdPedido = parseInt(req.params.idPedido as string);

            //chamar a função do modelo e armazenar a resposta
            const respostaModelo = await PedidoVenda.removerPedido(IdPedido);

            //verifica se a resposta do modelo foi verdadeiro (true)
            if (respostaModelo) {
                //retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "O pedido foi removido com sucesso!" })
            } else {
                //retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o pedido. Entre em contato com o administrador do sistema" })
            }

        } catch (error) {
            //lança uma mensagem de erro no console
            console.log(`Erro ao remover um pedido. ${error}`);

            //retorna uma mensagem de erro à quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o pedido. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const pedidoRecebido: PedidoVendaDTO = req.body;
            const idPedidoRecebido = parseInt(req.params.idPedido as string);
            const pedidoAtualizado = new PedidoVenda(
                pedidoRecebido.idCarro,
                pedidoRecebido.idCliente,
                pedidoRecebido.dataPedido,
                pedidoRecebido.valorPedido
            );
    
            pedidoAtualizado.setIdPedido(idPedidoRecebido);
            const respostaModelo = await PedidoVenda.atualizarPedido(pedidoAtualizado);
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Pedido atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o pedido. Entre em contato com o administrador do sistema" });
            }
        } catch (error) {
            console.log(`Erro ao atualizar um pedido ${error}`);
    
            return res.status(400).json({ mensagem: "Não foi possível atualizar o pedido. Entre em contato com o administrador do sistema" });
        }
    }
    
}

// Exporta a classe 'PedidoVendaController' para que possa ser utilizada em outras partes do código
export default PedidoVendaController;

