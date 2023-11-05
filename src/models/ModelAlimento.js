const mongoose = require("mongoose");

const ModelAlimento = mongoose.model("Alimento", {
    nome: {
        type: String,
        required: true,
    },
    durabilidadeArmazenamento: {
        type: String,
        required: true,
    },
    valorNutricional: {
        type: String,
        required: true,
    },
    reacaoIntestino: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    riscoAlergia: {
        type: String,
        required: true,
    },
    restricaoAlimentar: {
        type: String,
        required: true,
        enum: ["Intolerância a lactose", "Diabetes", "Intolerância a Glúten", "Hipertensão"],
    },
});

module.exports = ModelAlimento;