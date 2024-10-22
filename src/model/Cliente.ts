import { DatabaseModel } from "./DatabaseModel";

// Recupera o pool de conexões do banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um cliente.
 */
export class Cliente {

    /* Atributos */
    /**
     * Identificador do cliente.
     * Inicializado com o valor padrão de 0.
     */
    private idCliente: number = 0;

    /**
     * Nome do cliente.
     */
    private nome: string;

    /**
     * CPF do cliente.
     */
    private cpf: string;

    /**
     * Telefone do cliente.
     */
    private telefone: string;

    /**
     * Construtor da classe Cliente.
     * Inicializa os atributos com os valores fornecidos.
     * 
     * @param nome Nome do cliente.
     * @param cpf CPF do cliente.
     * @param telefone Telefone do cliente.
     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.nome = nome;         // Atribui o nome fornecido ao atributo nome.
        this.cpf = cpf;           // Atribui o CPF fornecido ao atributo cpf.
        this.telefone = telefone; // Atribui o telefone fornecido ao atributo telefone.
    }

    /* Métodos get e set */

    /**
     * Retorna o identificador do cliente.
     * 
     * @returns {number} O identificador do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente.
     * 
     * @param idCliente O novo identificador do cliente.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente.
     * 
     * @returns {string} O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome O nome do cliente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do cliente.
     * 
     * @returns {string} O CPF do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF do cliente.
     * 
     * @param cpf O CPF a ser definido.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente.
     * 
     * @returns {string} O telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     * 
     * @param telefone O telefone a ser definido.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - Reat - Update - Delete
    static async listarCliente(): Promise<Array<Cliente> | null> {
        //CRIANDO LISTA VAZIA PARA ARMAZENAR OS CLIENTES
        let listaDeClientes: Array<Cliente> = [];

        try {
            //Query para consulta no banco de dados
            const querySelectCliente = `SELECT * FROM cliente`;

            //executa a query no banco de dados
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((cliente) => {
                let novaCliente = new Cliente(
                    cliente.nome,
                    cliente.cpf,
                    cliente.telefone,
                )

                // adicionando o ID ao objeto
                novaCliente.setIdCliente(cliente.id);

                // adiconando o cliente a lista
                listaDeClientes.push(novaCliente);
            });

            // retornando a lista de clientes para quem chamou a função
            return listaDeClientes
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
            
        } 
        
    }
    

     /**
     * Realiza o cadastro de um cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `cliente` e insere seus dados (Nome,CPF e Telefone)
     * na tabela `Cliente` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do carro que será cadastrado. O objeto `Carro`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna `true` se o carro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertCliente = `INSERT INTO Cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        '${cliente.getCpf()}', 
                                        '${cliente.getTelefone()}')                                    
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}