const mongoose = require("mongoose");

const ModelReceita = mongoose.model("Receita", {
    nome: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: String,
        required: true,
    },
    modoPreparo: {
        type: String,
        required: true,
    },
    restricaoAlimentar: {
        type: String,
        required: true,
        enum: ["Intolerância a lactose", "Diabetes", "Intolerância a Glúten", "Hipertensão"],
    },
    tempoPreparo: {
        type: String,
        required: true,
    },
    rendimento: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
});

module.exports = ModelReceita;