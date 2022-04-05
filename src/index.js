const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// middleware
function verifyIfExistsAccountCPF(req, res, next) {
  // pega o cpf pelos headers params
  const { cpf } = req.headers;

  // encontra o objeto que possui esse cpf
  const customer = customers.find((customer) => customer.cpf === cpf);

  // nao existe = erro
  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }

  req.customer = customer;

  // existe = continua processo
  return next();
}

// criar conta
app.post("/account", (req, res) => {
  // informação vem da solicitação
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists)
    return res.status(400).json({ error: "Customer already exists!" });

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return res.status(201).send();
});

// listando extrato
app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  // retorna o array statement do cliente
  return res.json(customer.statement);
});

// inicializa na porta 3333
app.listen(3333);
