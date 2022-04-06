const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

// middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  // doesn't exists = error
  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }

  req.customer = customer;

  // exists = proceed
  return next();
}

// getting account balance
function getBalance(statement) {
  // reduce to one value
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

// creating account
app.post("/account", (req, res) => {
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

// listing statement
app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
});

// creating deposit
app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    create_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// creating withdraw
app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  // checking funds
  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds!" });
  }

  const statementOperation = {
    amount,
    create_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

// listing statement by date
app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  // searching transaction with the request
  const statement = customer.statement.filter(
    (statement) =>
      statement.create_at.toDateString() === new Date(dateFormat).toDateString()
  );

  return res.json(statement);
});

// changing name of account
app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
});

// returning account info
app.get("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

// removing account
app.delete("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(200).json(customers);
});

// returning account balance
app.get("/balance", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json(balance);
});

// initializing on port 3333
app.listen(3333);
