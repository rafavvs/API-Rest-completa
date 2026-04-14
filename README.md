# API de Jogos

Esta é uma API REST completa para gerenciar uma lista de jogos, construída com Node.js e Express.

## Funcionalidades

- Listar todos os jogos
- Buscar jogo por ID
- Filtrar por gênero e plataforma
- Ordenar por título ou nota
- Paginação
- Criar novos jogos
- Atualizar jogos existentes
- Deletar jogos

# Endpoints

## GET /api/jogos
Lista todos os jogos com opções de filtro, ordenação e paginação.

Parâmetros de consulta:
- `genero`: Filtrar por gênero (ex: `?genero=FPS`)
- `plataforma`: Filtrar por plataforma (ex: `?plataforma=PC`)
- `ordem`: Ordenar por `título` ou `nota` (ex: `?ordem=título`)
- `page`: Página para paginação (opcional)
- `limit`: Número de itens por página (opcional)

Se `page` e `limit` não forem usados, a resposta retorna todos os jogos disponíveis.

Exemplo sem paginação: `GET /api/jogos?genero=FPS&ordem=título`
Exemplo com paginação: `GET /api/jogos?genero=FPS&page=1&limit=5`

Resposta esperada sem paginação:
```json
{
  "sucesso": true,
  "total": 12,
  "dados": [
    {
      "id": 1,
      "titulo": "Valorant",
      "genero": "FPS",
      "plataforma": "PC/PS5/Xbox Series X|S",
      "ano": 2020,
      "preco": 0.00,
      "desenvolvedora": "Riot Games"
    }
  ]
}

## POST /api/jogos
Cria um novo jogo.

Corpo da requisição (JSON):

{
  "titulo": "The Witcher 3: Wild Hunt",
  "genero": "RPG",
  "plataforma": "PC/PS4/PS5/Xbox One/Xbox Series X|S",
  "ano": 2015,
  "preco": 79.99,
  "desenvolvedora": "CD Projekt Red"
}

Resposta de sucesso (201):

{
  "sucesso": true,
  "mensagem": "Jogo criado com sucesso",
  "dados": {
    "id": 13,
    "titulo": "The Witcher 3: Wild Hunt",
    "genero": "RPG",
    "plataforma": "PC/PS4/PS5/Xbox One/Xbox Series X|S",
    "ano": 2015,
    "preco": 79.99,
    "desenvolvedora": "CD Projekt Red"
  }
}

Resposta de erro (400):

{
  "sucesso": false,
  "erros": [
    "O campo 'titulo' é obrigatório e deve ser uma string não vazia.",
    "O campo 'ano' deve ser um número inteiro entre 1950 e o ano atual."
  ]
}

ou

{
  "sucesso": false,
  "mensagem": "Já existe um jogo cadastrado com esse título."
}

Validações implementadas:
- `titulo`: obrigatório, string não vazia, único na coleção.
- `genero`: obrigatório, string não vazia.
- `plataforma`: obrigatória, string não vazia.
- `ano`: obrigatório, inteiro entre 1950 e o ano atual.
- ´preco´: obrigatório, número não-negativo.
- `desenvolvedora`: obrigatória, string não vazia.

## PUT /api/jogos/:id
Atualiza os dados de um jogo existente. O corpo da requisição e as validações seguem as mesmas regras do método POST, porém os campos são opcionais (envie apenas o que deseja alterar).

## DELETE /api/jogos/:id
Deleta um jogo específico pelo ID.

## GET /api/jogos/:id
Busca um jogo específico pelo ID.

Exemplo: GET /api/jogos/1

Resposta esperada:

JSON
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "titulo": "Valorant",
    "genero": "FPS",
    "plataforma": "PC/PS5/Xbox Series X|S",
    "ano": 2020,
    "preco": 0.00,
    "desenvolvedora": "Riot Games"
  }
}
## GET /
Retorna uma mensagem de status simples.

Exemplo: GET /

Resposta esperada:

JSON
{
  "mensagem": "API REST completa de jogos funcionando!",
  "status": "sucesso",
  "timestamp": "2026-04-14T00:00:00.000Z"
}

## GET /info
Retorna informações sobre a API.

Exemplo: GET /info

Resposta esperada:

JSON
{
  "nome": "API REST completa de jogos",
  "versao": "1.0.0",
  "autor": "Rafael Vasconcelos"
}

## Como executar
1. Instale as dependências: npm install
2. Execute o servidor: npm start ou npm run dev para desenvolvimento
3. A API estará disponível em http://localhost:3000

## Estrutura dos dados
Cada jogo tem os seguintes campos:

- `id`: Identificador único (Número)
- `titulo`: Título do jogo (String)
- `genero`: Gênero do jogo (String)
- `plataforma`: Plataformas disponíveis (String)
- `ano`: Ano de lançamento (Número)
- `preco`: Preço do jogo (Número)
- `desenvolvedora`: Estúdio desenvolvedor (String)

## Postman Collection

Importe o arquivo "postman_collection.json" no Postman para testar todos os endpoints.

A coleção inclui requisições pré-configuradas para testar todas as funcionalidades da API com:
- Listagem geral: Retorna todos os jogos cadastrados.
- Filtros de busca: Exemplos de requisições filtrando por gênero e plataforma.
- Ordenação: Exemplo de como ordenar a lista por título.
- Paginação: Demonstração do uso dos parâmetros page e limit.
- Criação (POST): 5 exemplos com payloads (corpo da requisição) preenchidos para cadastrar novos jogos.
- Busca por ID: Retorna os detalhes de um jogo específico.
- Atualização (PUT): Exemplo de alteração parcial de um jogo (ex: mudando apenas o preço).
- Deleção (DELETE): Exemplo de como remover um jogo utilizando o seu ID.
- Rotas de utilidade: Requisições para os endpoints / (status) e /info (metadados da API).