// Dependencies
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Model
const ModelLogin = require("../models/ModelLogin");

// Routes

// Listar todos os usuários
router.get("/", async (req, res) => {
  const usuarios = await ModelLogin.find({});
  return res.status(200).send(usuarios);
});

// Listar um usuário
router.get("/:id", async (req, res) => {
  const usuario = await ModelLogin.findById(req.params.id);
  return res.status(200).send(usuario);
});

// Login
router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(422).send({ error: "Email não informado" });
  }
  if (!senha) {
    return res.status(422).send({ error: "Senha não informada" });
  }

  const usuarioSenha = await ModelLogin.findOne({ email: email });

  if (!usuarioSenha) {
    return res.status(401).send({ error: "Usuário ou senha inválida" });
  }

  bcrypt.compare(senha, usuarioSenha.senha, (err, result) => {
    if (err) {
      return res.status(401).send({ error: "Erro ao descriptografar a senha" });
    }

    if (result) {
      return res.status(200).send({ message: "Autenticado com sucesso" });
    }

    return res.status(401).send({ error: "Usuário ou senha inválidos" });
  });
});

// Cadastro
router.post("/cadastro", async (req, res) => {
  const { email, senha, dataNascimento, nome, restricaoAlimentar, categoriaPlano } = req.body;

  if (!nome) {
    return res.status(422).send({ error: "Nome não informado" });
  }
  if (!email) {
    return res.status(422).send({ error: "Email não informado" });
  }
  if (!dataNascimento) {
    return res.status(422).send({ error: "Data de nascimento não informada" });
  }
  if (!senha) {
    return res.status(422).send({ error: "Senha não informada" });
  }
  if(!categoriaPlano){
    return res.status(422).send({ error: "Categoria do plano não informada" });
  }
  if(!restricaoAlimentar){
    return res.status(422).send({ error: "Restrição alimentar não informada" });
  }

  const userExist = await ModelLogin.findOne({ email });
  if (userExist) {
    return res.status(422).send({ error: "Usuário já cadastrado" });
  }

  bcrypt.hash(senha, 12, async (err, hash) => {
    if (err) {
      return res.status(500).send({ error: "Erro ao criptografar a senha" });
    }

    try {
      await ModelLogin.create({ email, senha: hash, dataNascimento, nome, restricaoAlimentar, categoriaPlano });
      return res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res.status(500).send({ error: "Erro ao cadastrar usuário" });
    }
  });
});

module.exports = router;
