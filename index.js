const dotenv = require("dotenv");
dotenv.config();
// Pacotes instalados
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyparser = require('body-parser');

// bodyparser config
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Rotas
const login = require("./src/routes/login");
const receita = require("./src/routes/receita");
const alimentos = require("./src/routes/alimento");

app.use("/login", login);
app.use("/receita", receita);
app.use("/alimento", alimentos);

// Configurações
app.use(express.json());


app.get("/", (req, res) => {
  return res.status(200).send({ message: "Bem vindo a API do MealMate" });
});

// Inicialização do banco de dados
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Conectado ao banco de dados");
      console.log("Servidor rodando na porta: " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
