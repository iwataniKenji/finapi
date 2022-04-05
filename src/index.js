const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  // informação vem da solicitação
  const { cpf, name } = req.body;

  // gera id aleatório
  const id = uuidv4();

  customers.push({
    cpf,
    name,
    id,
    statement: [],
  });

  return res.status(201).send();
});

// inicializa na porta 3333
app.listen(3333);
