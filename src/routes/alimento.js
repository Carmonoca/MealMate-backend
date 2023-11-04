const express = require("express");
const router = express.Router();


// Model
const ModelAlimento = require("../models/ModelAlimento");

// Routes

// Listar todos os alimentos
router.get("/", async (req, res) => {
    const alimentos = await ModelAlimento.find({});
    return res.status(200).send(alimentos);
});

// Listar um alimento
router.get("/:id", async (req, res) => {
    const alimento = await ModelAlimento.findById(req.params.id);
    return res.status(200).send(alimento);
});

// Cadastrar um alimento
router.post("/", async (req, res) => {
    const { nome, durabilidadeArmazenamento, valorNutricional, reacaoIntestino, riscoAlergia, restricaoAlimentar } = req.body;

    if (!nome) {
        return res.status(422).send({ error: "Nome não informado" });
    }
    if (!durabilidadeArmazenamento) {
        return res.status(422).send({ error: "Durabilidade de armazenamento não informada" });
    }
    if (!valorNutricional) {
        return res.status(422).send({ error: "Valor nutricional não informado" });
    }
    if (!reacaoIntestino) {
        return res.status(422).send({ error: "Reação intestinal não informada" });
    }
    if (!riscoAlergia) {
        return res.status(422).send({ error: "Risco de alergia não informado" });
    }
    if (!restricaoAlimentar) {
        return res.status(422).send({ error: "Restrição alimentar não informada" });
    }

    const alimento = await ModelAlimento.create(req.body);
    return res.status(201).send(alimento);
});

module.exports = router;