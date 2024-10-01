-- Criar tabelas
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    data_cadastro DATE NOT NULL
);

CREATE TABLE carros (
    id_carro SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INTEGER NOT NULL,
    cor VARCHAR(20) NOT NULL
);

CREATE TABLE pedidos_venda (
    id_pedido SERIAL PRIMARY KEY,
    id_carro INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    data_pedido DATE NOT NULL,
    valor_pedido DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_carro) REFERENCES carros(id_carro),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Inserir dados
INSERT INTO clientes (nome, cpf, telefone, data_cadastro)
VALUES
    ('João Silva', '123.456.789-01', '11 98765-4321', '2022-01-01'),
    ('Maria Oliveira', '987.654.321-09', '11 87654-3210', '2022-02-01'),
    ('Pedro Alves', '456.789.012-34', '11 76543-2109', '2022-03-01');

INSERT INTO carros (marca, modelo, ano, cor)
VALUES
    ('Ford', 'Focus', 2015, 'Prata'),
    ('Fiat', 'Punto', 2018, 'Branco'),
    ('Volkswagen', 'Gol', 2020, 'Preto');

INSERT INTO pedidos_venda (id_carro, id_cliente, data_pedido, valor_pedido)
VALUES
    (1, 1, '2022-04-01', 20000.00),
    (2, 2, '2022-05-01', 25000.00),
    (3, 3, '2022-06-01', 30000.00);