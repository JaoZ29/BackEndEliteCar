import { Request, Response, Router } from "express";
import {ClienteController} from "./controller/ClienteController";
import { CarroController } from "./controller/CarroController";
import {PedidoVendaController} from "./controller/PedidoVendaController";

//Cria um roteador
const router = Router();

//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

// aqui você deve colocar as outras rotas da sua aplicação.

//rotas cliente
router.get("/lista/clientes", ClienteController.todos);
router.post("/novo/cliente", ClienteController.novo);
router.delete("/delete/cliente/:idCliente", ClienteController.remover);
router.put("/atualizar/cliente/:idCliente", ClienteController.atualizar);

//rotas carro
router.get("/lista/carros", CarroController.todos);
router.post("/novo/carro", CarroController.novo);
router.delete("/delete/carro/:idCarro", CarroController.remover);
router.put("/atualizar/carro/:idCarro", CarroController.atualizar);

//rotas pedido
router.get("/lista/pedido", PedidoVendaController.todos);
router.post("/novo/pedido", PedidoVendaController.novo);
router.delete("/delete/pedido/:idPedido", PedidoVendaController.remover);
router.put("/atualizar/pedido/:idPedido", PedidoVendaController.atualizar);

//Exportando as rotas
export { router };