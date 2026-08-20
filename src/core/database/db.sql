DROP DATABASE IF EXISTS empilhadeira;

CREATE DATABASE IF NOT EXISTS empilhadeira;

USE empilhadeira;

CREATE TABLE IF NOT EXISTS funcionario(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    data_nasc DATE NOT NULL,
    telefone VARCHAR(11) NULL,
    cargo ENUM("operador", "supervisor", "tecnico", "gerente") DEFAULT "operador",
    ativo BOOL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS usuario(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    funcionario INT UNSIGNED NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM("operador", "supervisor", "admin"),
    ativo BOOL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (funcionario) REFERENCES funcionario(id)
);

CREATE TABLE IF NOT EXISTS empilhadeira(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(100) NOT NULL UNIQUE,
    status ENUM("disponivel", "operando", "parada") DEFAULT "disponivel"
);

CREATE TABLE IF NOT EXISTS telemetria(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    empilhadeira INT UNSIGNED NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    posicao_x INT UNSIGNED,
    posicao_y INT UNSIGNED,
    nivel_bateria INT UNSIGNED,
    velocidade DECIMAL(5,2),
    peso_carga DECIMAL(8,2),
    temperatura DECIMAL(5,2),
    sensor_linha VARCHAR(100),
    obstaculo BOOL DEFAULT FALSE,
    FOREIGN KEY (empilhadeira) REFERENCES empilhadeira(id)
);

CREATE INDEX idx_telemetria_data_hora ON telemetria(data_hora);

INSERT INTO funcionario(nome, cpf, data_nasc, telefone, cargo) VALUES("Zuleica", "33344455599", "2003-02-01", "11999333777", "tecnico");