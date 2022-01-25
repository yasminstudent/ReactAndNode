//Importa
const express = require("express");

//Chamada da função express
const server = express();

//Informa ao Node que usaremos json no corpo da requisição
server.use(express.json());

/*
  Query params = ?var=conteudo
  Para usar: req.query.var

  Route params = /users/1
  Para usar:
    rota: "/users/:id" 
    req.params.id
  
  Request body = { "nome": "Yasmin", "email": "teste@gmail.com" }
  Para usar: req.body

  Middleware é uma função que recebe como parâmetro a requisição, a resposta
  e talvez outros e manipula isso de alguma forma
*/

//Array de usuários
const users = ["Yasmin", "Sabrina", "Guilherme"];

//Middleware global - Sempre é executado
server.use((req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  //Prossegue a (s) outra (s) função (ões)
  return next();
});

//Middlewares locais

function checkUserExists(req, res, next) {
  //Caso não exista name no body
  if (!req.body.name) {
    return res.status(400).json({ error: "Nome do usuário é obrigatório" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  //Caso não exista um usuário com o indice informado
  if (!users[req.params.indice]) {
    return res.status(400).json({ error: "Esse usuário não existe" });
  }

  return next();
}

//Lista usuário por id/indice
server.get("/users/:indice", checkUserInArray, (req, res) => {
  //Resgata o indice informado na url
  const { indice } = req.params;

  return res.json(users[indice]);
});

//Lista todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

//Cria um usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  //Add no array de usuários
  users.push(name);

  return res.json(users);
});

//Edita um usuário
server.put("/users/:indice", checkUserInArray, checkUserExists, (req, res) => {
  const { name } = req.body;
  const { indice } = req.params;

  users[indice] = name;

  return res.json(users);
});

//Excui um usuário
server.delete("/users/:indice", checkUserInArray, (req, res) => {
  const { indice } = req.params;

  //Deleta 1 usuário a partir da posição indice
  users.splice(indice, 1);

  return res.json(users);
});

//Faz o servidor ser aberto na porta 3000
server.listen(3000);
