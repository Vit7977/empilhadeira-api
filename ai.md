# AI.md — Contexto e Diretrizes do Projeto

## 1. Visão Geral

Este documento define o contexto técnico e as diretrizes que devem ser utilizadas por uma IA ao trabalhar no projeto **Empilhadeira Autônoma Seguidora de Linha — API Backend**.

O projeto é parte de um **Trabalho de Conclusão de Curso (TCC)** e está em desenvolvimento. A API tem como finalidade dar suporte ao funcionamento de uma empilhadeira autônoma, permitindo o gerenciamento operacional, autenticação de usuários, controle das empilhadeiras e recebimento de dados de telemetria enviados por um ESP32.

O ESP32 atua como o "cérebro" embarcado da empilhadeira: controla sensores e motores e envia informações de telemetria para a API REST.

> **Importante:** o projeto está em desenvolvimento ativo. A estrutura, tecnologias, banco de dados, endpoints e regras de negócio podem sofrer alterações.

---

## 2. Objetivo do Projeto

O ecossistema deve fornecer suporte a uma solução de logística interna automatizada, contemplando:

1. **Navegação autônoma**
   - Orientação da empilhadeira por uma pista demarcada por linha.
   - Leitura de sensores de linha e obstáculos.
   - Controle dos motores pelo ESP32.

2. **Telemetria**
   - Registro de posição X e Y.
   - Nível de bateria.
   - Velocidade.
   - Peso da carga.
   - Temperatura.
   - Estado dos sensores de linha.
   - Detecção de obstáculos.

3. **Gestão operacional**
   - Cadastro de funcionários.
   - Cadastro e autenticação de usuários.
   - Controle de níveis de acesso.
   - Cadastro e controle de status das empilhadeiras.

---

## 3. Stack Tecnológica

### Backend

- **Node.js**
  - Ambiente de execução JavaScript.
  - O projeto utiliza ES Modules através de `"type": "module"` no `package.json`.

- **Express.js `^5.2.1`**
  - Framework utilizado para criação da API REST.

- **CORS `^2.8.6`**
  - Permite requisições Cross-Origin.

- **Dotenv `^17.4.2`**
  - Utilizado para carregamento de variáveis de ambiente.

### Validação e segurança

- **Zod `^4.4.3`**
  - Utilizado para definição de schemas e validação dos dados recebidos pela API.

- **Argon2 `^0.45.1`**
  - Utilizado para hashing seguro de senhas.

### Banco de dados

- **MySQL**
  - SGBD relacional utilizado pelo projeto.

- **MySQL2 `^3.23.3`**
  - Driver utilizado para comunicação entre Node.js e MySQL.
  - Utiliza Promises e Connection Pool.

### Desenvolvimento

- **Nodemon `^3.1.14`**
  - Reinicia automaticamente o servidor durante o desenvolvimento.

---

## 4. Arquitetura

O projeto utiliza **Feature-Based Architecture**.

A aplicação é organizada em módulos de domínio e camadas responsáveis por diferentes funções.

### Arquivos principais

#### `server.js`

Ponto de entrada do servidor HTTP Express.

Responsabilidades:

- Inicializar o Express.
- Configurar middlewares globais.
- Configurar a porta da API.
- Carregar e registrar as rotas.

#### `mapRoutes.js`

Centraliza o registro das rotas dos módulos da aplicação.

#### `src/core/`

Contém configurações e infraestrutura central.

##### `src/core/config/config.js`

Centraliza configurações relacionadas à aplicação e conexão com o banco.

##### `src/core/database/pool.js`

Cria e disponibiliza o pool de conexões do MySQL através do `mysql2`.

##### `src/core/database/db.sql`

Contém o script DDL responsável pela criação da estrutura do banco de dados.

---

## 5. Arquitetura das Features

Cada feature deve seguir, preferencialmente, cinco camadas:

```text
feature/
├── router.js
├── controller.js
├── service.js
├── repository.js
└── dto.js
```

### Router

Responsável por:

- Definir endpoints.
- Associar endpoints aos controllers.
- Aplicar middlewares necessários.

Exemplo conceitual:

```javascript
router.post("/", validate(schema), controller.create);
```

### Controller

Responsável pelo ciclo HTTP:

- Receber `req`.
- Chamar o Service.
- Retornar a resposta HTTP adequada.

O Controller não deve concentrar regras de negócio ou queries SQL.

### Service

Responsável pelas regras de negócio.

Exemplos:

- Verificar condições antes de cadastrar.
- Coordenar operações.
- Aplicar regras do domínio.
- Chamar o Repository.

### Repository

Responsável exclusivamente pelo acesso ao banco.

As queries SQL devem ficar nessa camada.

Exemplo:

```javascript
const [result] = await pool.execute(
  "INSERT INTO funcionario (...) VALUES (...)",
  [...]
);
```

### DTO

Responsável pela validação e definição dos formatos esperados de entrada usando Zod.

---

## 6. Middlewares e Utilitários

### `src/middlewares/validate.js`

Middleware genérico de validação.

Utiliza Zod e `safeParse` para verificar se os dados recebidos correspondem ao schema esperado.

### `src/utils/response.js`

Responsável por padronizar as respostas JSON da API.

Formato utilizado:

```json
{
  "success": true,
  "status": 200,
  "message": "Operação realizada com sucesso",
  "error": "",
  "data": null,
  "quant": 0
}
```

Ao criar novos endpoints, deve-se manter esse padrão de resposta.

---

## 7. Estrutura Atual do Projeto

```text
empilhadeira-api/
├── .gitignore
├── README.md
├── mapRoutes.js
├── package-lock.json
├── package.json
├── server.js
└── src/
    ├── core/
    │   ├── config/
    │   │   └── config.js
    │   └── database/
    │       ├── db.sql
    │       └── pool.js
    ├── features/
    │   └── funcionario/
    │       ├── controller.js
    │       ├── dto.js
    │       ├── repository.js
    │       ├── router.js
    │       └── service.js
    ├── middlewares/
    │   └── validate.js
    └── utils/
        └── response.js
```

---

## 8. Banco de Dados

O banco utilizado é o **MySQL**, acessado através do `mysql2` e de um pool de conexões.

O banco possui as seguintes tabelas principais:

- `funcionario`
- `usuario`
- `empilhadeira`
- `telemetria`

### Relacionamentos

```text
funcionario 1 ─── N usuario

empilhadeira 1 ─── N telemetria
```

### `funcionario`

Armazena os funcionários.

Campos principais:

- `id`
- `nome`
- `cpf`
- `data_nasc`
- `telefone`
- `cargo`
- `ativo`

Cargos:

```text
operador
supervisor
tecnico
gerente
```

### `usuario`

Armazena os dados de acesso.

Campos principais:

- `id`
- `funcionario`
- `email`
- `senha`
- `nivel_acesso`
- `ativo`
- `created_at`

A senha deve ser armazenada como hash utilizando **Argon2**.

Níveis de acesso:

```text
operador
supervisor
admin
```

### `empilhadeira`

Representa as empilhadeiras físicas.

Campos:

- `id`
- `codigo`
- `status`

Status disponíveis:

```text
disponivel
operando
parada
```

### `telemetria`

Armazena as informações enviadas pelo ESP32.

Campos:

- `id`
- `empilhadeira`
- `data_hora`
- `posicao_x`
- `posicao_y`
- `nivel_bateria`
- `velocidade`
- `peso_carga`
- `temperatura`
- `sensor_linha`
- `obstaculo`

Existe um índice na coluna `data_hora` para otimização de consultas temporais.

---

## 9. API Atual

O prefixo atualmente mapeado é:

```text
/api/funcionario
```

O módulo `funcionario` possui:

- DTO com Zod.
- Controller.
- Service.
- Repository.
- Router.

Porém, conforme o README atual, as rotas HTTP específicas ainda precisam ser explicitamente vinculadas no objeto `Router`.

A rota planejada para criação é conceitualmente:

```text
POST /api/funcionario
```

com validação através do middleware `validate(funcionarioSchema)`.

---

## 10. Estado Atual

### Implementado

- Servidor Express.
- CORS.
- Parser JSON.
- Carregamento dinâmico de rotas.
- Pool de conexão MySQL.
- Modelagem do banco.
- Middleware de validação com Zod.
- Padronização de respostas HTTP.
- Estrutura parcial do módulo de funcionários.

### Parcialmente implementado

#### Funcionário

Já possui:

- DTO.
- Controller.
- Service.
- Repository.

Ainda é necessário vincular explicitamente as rotas no `router.js`.

### Planejado

#### Usuário

Criar:

- DTO.
- Repository.
- Service.
- Controller.
- Router.
- Autenticação.
- Hash de senha com Argon2.

#### Empilhadeira

Criar:

- DTO.
- Repository.
- Service.
- Controller.
- Router.
- Cadastro.
- Atualização de status.

#### Telemetria

Criar:

- DTO.
- Repository.
- Service.
- Controller.
- Router.
- Endpoint para recebimento dos dados enviados pelo ESP32.

#### ESP32

Implementar:

- Firmware.
- Seguimento de linha.
- Leitura dos sensores.
- Controle dos motores.
- Comunicação HTTP com a API.
- Envio periódico da telemetria.

---

## 11. Próximos Passos Prioritários

A ordem de desenvolvimento indicada pelo projeto é:

1. Vincular as rotas do módulo `funcionario`.
2. Desenvolver o módulo `usuario`.
3. Implementar hashing de senhas com Argon2.
4. Desenvolver o módulo `empilhadeira`.
5. Desenvolver o módulo `telemetria`.
6. Criar os endpoints de comunicação com o ESP32.
7. Implementar o firmware do ESP32.
8. Integrar o hardware com a API.
9. Realizar testes de bancada e posteriormente testes de pista.

---

## 12. Regras para Desenvolvimento Assistido por IA

Ao modificar ou criar código neste projeto, seguir estas regras:

### Regra 1 — Respeitar a arquitetura

Novas funcionalidades devem seguir a arquitetura existente:

```text
Router → Controller → Service → Repository
                  ↑
                 DTO
```

Evitar colocar queries SQL no Controller ou regras de negócio no Repository.

### Regra 2 — JavaScript

O projeto utiliza **JavaScript**, não TypeScript.

Não introduzir:

- `.ts`
- `.tsx`
- interfaces TypeScript
- tipos TypeScript
- `type` declarations

sem solicitação explícita.

### Regra 3 — Validação

Dados recebidos pela API devem ser validados através de **Zod** sempre que existir um DTO/schema para aquela operação.

### Regra 4 — Banco de dados

Queries SQL devem ficar no Repository.

Utilizar o pool existente em:

```text
src/core/database/pool.js
```

Não criar uma nova conexão com o banco sem necessidade.

### Regra 5 — Senhas

Nunca armazenar senhas em texto puro.

O projeto utiliza:

```text
Argon2
```

para hashing de senhas.

### Regra 6 — Respostas HTTP

Novos endpoints devem utilizar o padrão de resposta existente em:

```text
src/utils/response.js
```

Não criar formatos de resposta incompatíveis sem necessidade.

### Regra 7 — Não inventar funcionalidades

Não assumir que uma funcionalidade já existe apenas porque ela está planejada.

Diferenciar claramente:

- Implementado.
- Parcialmente implementado.
- Planejado.

### Regra 8 — Compatibilidade

Antes de alterar uma parte da arquitetura, verificar como ela se relaciona com:

- `server.js`
- `mapRoutes.js`
- `pool.js`
- `validate.js`
- `response.js`
- módulos existentes.

### Regra 9 — Mudanças mínimas

Ao corrigir um erro, alterar somente o necessário para resolver o problema.

Evitar refatorações grandes quando elas não forem solicitadas.

### Regra 10 — Explicação

Ao ensinar ou modificar código para fins acadêmicos, explicar:

1. O que foi alterado.
2. Por que foi alterado.
3. Qual problema resolve.
4. Como as camadas se relacionam.
5. Como testar a alteração.

---

## 13. Fluxo Esperado de uma Requisição

Uma requisição típica deve seguir este fluxo:

```text
Cliente
   ↓
Router
   ↓
Middleware de validação
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
Resposta padronizada
   ↓
Cliente
```

No caso da telemetria:

```text
ESP32
   ↓
HTTP/JSON
   ↓
API Express
   ↓
Validação Zod
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
```

---

## 14. Configuração Atual

Pré-requisitos:

- Node.js 18 ou superior.
- MySQL em execução.

Instalação:

```bash
npm install
```

Banco de dados:

```bash
mysql -u root -p < src/core/database/db.sql
```

Execução em desenvolvimento:

```bash
npm run dev
```

Porta padrão:

```text
3000
```

URL local:

```text
http://localhost:3000
```

Configurações atualmente descritas no projeto:

```text
API_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=empilhadeira
```

---

## 15. Contexto para a IA

Sempre considerar que esta API é apenas uma parte de um sistema maior.

O ecossistema possui:

```text
ESP32
   ↓
Empilhadeira Autônoma
   ↓
Telemetria
   ↓
API REST Node.js/Express
   ↓
MySQL
   ↑
Frontend / Aplicações Cliente
```

A API não é responsável diretamente pelo controle físico dos motores. O controle da empilhadeira é responsabilidade do ESP32.

A API é responsável principalmente por:

- receber informações;
- validar dados;
- aplicar regras de negócio;
- persistir informações;
- disponibilizar dados para aplicações clientes;
- gerenciar usuários e funcionários;
- gerenciar empilhadeiras;
- armazenar telemetria.

---

## 16. Cuidados Importantes

Ao trabalhar neste projeto:

- Não remover funcionalidades existentes sem solicitação.
- Não alterar o banco sem considerar os relacionamentos existentes.
- Não criar uma arquitetura diferente da Feature-Based Architecture sem necessidade.
- Não colocar lógica SQL em Controllers.
- Não armazenar senhas sem hashing.
- Não ignorar validações Zod.
- Não criar respostas HTTP incompatíveis com `response.js`.
- Não considerar módulos planejados como implementados.
- Manter o código em JavaScript.
- Preservar a compatibilidade com Node.js e Express utilizados pelo projeto.
- Priorizar alterações pequenas, claras e fáceis de compreender.

---

## 17. Referência Principal

Este documento foi elaborado com base no `README.md` atual do projeto.

O README descreve o projeto como um TCC em desenvolvimento e informa que sua estrutura, funcionalidades, tecnologias, banco de dados e arquitetura podem sofrer alterações durante a evolução do projeto.

Portanto, este arquivo deve ser atualizado quando houver mudanças relevantes na arquitetura ou no estado real da aplicação.
