const express = require("express");

const app = express();

// parâmetro do get -> rota, (req, res)
app.get("/", (req, res) => {
  return response.json({ message: "Hello World Ignite" });
});

// listen -> inicia aplicação na porta 3333
app.listen(3333);
