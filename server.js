const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const requireDir = require("require-dir")

// Iniciando o App
const app = express(); 
app.use(express.json()); 
app.use(cors());

// Iniciando o BD
mongoose.connect("mongodb://localhost:27017/aperfumada", { useNewUrlParser: true }) // , { useNewUrlParser: true } - verificar se ainda precisa usar esse ultimo param, mas acho q nao. / se nao der nenhum erro no terminal ele canseguiu fazer a conexao

requireDir("./src/models")

// Primeira rota
app.use("/", require("./src/routes")) 



app.listen(3001);
