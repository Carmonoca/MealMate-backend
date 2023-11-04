const mongoose = require("mongoose");

const ModelLogin = mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
    restricaoAlimentar: {
        type: String,
        required: true,
        enum: ["Intolerância a lactose", "Diabetes", "Intolerância a Glúten", "Hipertensão"],
    },
    categoriaPlano: {
        type: String,
        required: true,
        enum: ["Adulto", "Infantil", "Gestante/Lactante", "Idoso"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        min: 6,
    }
})

module.exports = mongoose.model("Login", ModelLogin);