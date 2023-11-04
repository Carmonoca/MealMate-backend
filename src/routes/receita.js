const express = require("express");
const router = express.Router();

// Model
const ModelReceita = require("../models/ModelReceita");

// Routes

// Listar todos as receitas
router.get("/", async (req, res) => {
    const receitas = await ModelReceita.find({});
    return res.status(200).send(receitas);
});

// Listar uma receita
router.get("/:id", async (req, res) => {
    const receita = await ModelReceita.findById(req.params.id);
    return res.status(200).send(receita);
});

// Cadastrar uma receita
router.post("/", async (req, res) => {
    const { nome, ingredientes, modoPreparo, tempoPreparo, rendimento, categoria } = req.body;

    if (!nome) {
        return res.status(422).send({ error: "Nome não informado" });
    }
    if (!ingredientes) {
        return res.status(422).send({ error: "Ingredientes não informados" });
    }
    if (!modoPreparo) {
        return res.status(422).send({ error: "Modo de preparo não informado" });
    }
    if (!tempoPreparo) {
        return res.status(422).send({ error: "Tempo de preparo não informado" });
    }
    if (!rendimento) {
        return res.status(422).send({ error: "Rendimento não informado" });
    }
    if (!categoria) {
        return res.status(422).send({ error: "Categoria não informada" });
    }

    const receita = await ModelReceita.create(req.body);
    return res.status(201).send(receita);
});


module.exports = router;