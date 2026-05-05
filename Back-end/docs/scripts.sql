CREATE DATABASE loja_s1_r3_r4;

USE loja_s1_r3_r4;


CREATE TABLE IF NOT EXISTS categorias (
    idCategoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomeCategoria VARCHAR(50) NOT NULL,
    dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS produtos (
    idProduto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomeProduto VARCHAR(100) NOT NULL,
    valorProduto DECIMAL(10, 2) NOT NULL,
    idCategoria INT NOT NULL,
    vinculoImagem VARCHAR(100) NOT NULL,
    CONSTRAINT fk_categoria_produtos FOREIGN KEY (idCategoria) REFERENCES categorias (idCategoria)
);


CREATE TABLE IF NOT EXISTS clientes (
    idCliente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomeCliente VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Vendedores (
    idVendedor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nomeVendedor VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pedidos (
    idPedido INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dataPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valorPedido DECIMAL(10, 2) NOT NULL,
    idVendedor INT NOT NULL,
    idCliente INT NOT NULL,
    CONSTRAINT fk_cliente_pedidos FOREIGN KEY (idCliente) REFERENCES clientes (idCliente),
    CONSTRAINT fk_vendedor_pedidos FOREIGN KEY (idVendedor) REFERENCES vendedores (idVendedor)
);

CREATE TABLE IF NOT EXISTS itensPedidos (
    idItensPedidos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idProduto INT NOT NULL,
    idPedido INT NOT NULL,
    quantidade DECIMAL(10, 2),
    valorTotal DECIMAL(10, 2),
    CONSTRAINT fk_produto_itensPedidos FOREIGN KEY (idProduto) REFERENCES produtos (idProduto),
    CONSTRAINT fk_pedido_itensPedidos FOREIGN KEY (idPedido) REFERENCES pedidos (idPedido)
);

-- DROP DATABASE loja_s1_r3_r4;

-- Tarefas:
--Utilizando o modelo da atividade S1_R3_R4 - AT2_PBE 2, crie um novo projeto que contenha para uma loja de equipamentos para informática que contenhaas seguintes entidades: Categorias, Produtos, Clientes, Pedidos, ItensPedidos e Vendedores