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

// pega extrato da conta
function getBalance(statement) {
  // reduz todos os valores em um, iniciando com zero
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

// criar conta
app.post("/account", (req, res) => {
  // pegando valores do request
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
  // pegando valores do request
  const { customer } = req;

  // retornando array com extrato do cliente
  return res.json(customer.statement);
});

// criando depósito
app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  // pegando valores do request
  const { description, amount } = req.body;
  const { customer } = req;

  // criando objeto de transação
  const statementOperation = {
    description,
    amount,
    create_at: new Date(),
    type: "credit",
  };

  // inserindo transação no usuário
  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// criando saque
app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  // pegando valores do request
  const { amount } = req.body;
  const { customer } = req;

  // pegando extrato da conta
  const balance = getBalance(customer.statement);

  // checando suficiência
  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds!" });
  }

  // criando objeto de transação
  const statementOperation = {
    amount,
    create_at: new Date(),
    type: "debit",
  };

  // inserindo transação no usuário
  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// listando extrato por data
app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
  // pegando valores do request
  const { customer } = req;
  const { date } = req.query;

  // encontra dia independente do horário
  const dateFormat = new Date(date + " 00:00");

  // encontra movimentação que condiz com req
  const statement = customer.statement.filter(
    (statement) =>
      statement.create_at.toDateString() === new Date(dateFormat).toDateString()
  );

  // retornando array com extrato do cliente
  return res.json(statement);
});

// inicializa na porta 3333
app.listen(3333);
