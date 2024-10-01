/**
 * Classe que representa um pedido de venda.
 */
export class PedidoVenda {

    /* Atributos */
    /* Identificador do pedido */
    private idPedido: number = 0;
    /* Identificador do carro associado ao pedido */
    private idCarro: number;
    /* Identificador do cliente associado ao pedido */
    private idCliente: number;
    /* Data do pedido */
    private dataPedido: Date;
    /* Valor total do pedido */
    private valorPedido: number;

    /**
     * Construtor da classe PedidoVenda
     * 
     * @param idCarro Identificador do carro
     * @param idCliente Identificador do cliente
     * @param dataPedido Data do pedido
     * @param valorPedido Valor do pedido
     */
    constructor(
        idCarro: number,
        idCliente: number,
        dataPedido: Date,
        valorPedido: number
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do pedido
     * @returns o identificador do pedido
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do pedido
     * @param idPedido novo identificado do pedido
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Retorna o identificador do carro associado ao pedido.
     *
     * @returns {number} O identificador do carro.
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define o identificador do carro associado ao pedido.
     * 
     * @param idCarro - O identificador do carro a ser definido.
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna o identificador do cliente associado ao pedido.
     *
     * @returns {number} O identificador do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente associado ao pedido.
     * 
     * @param idCliente - O identificador do cliente a ser definido.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna a data do pedido.
     *
     * @returns {Date} A data do pedido.
     */
}