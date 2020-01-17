const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

const porta = 3030

mongoose.connect('mongodb+srv://luanpanno:omnistack@cluster0-bhbkx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(porta, () => {
    console.log(`Servidor de pé em http://localhost:${porta}`)
    console.log('Para desligar o nosso servidor: CTRL + C')
})

// Métodos HTTP: get, post, put, delete
// get = receber informação (listar users, buscar 1 user)
// post = criar alguma informação (salvar produto, cadastrar user)
// put = editar usuário ou recurso da aplicação
// delete

// Tipos de parâmetros
// Query Params: req.query -> usados para filtros, ordenação, paginação...
// Route Params: req.params -> identificar recurso na alteração ou remoção
// Body: req.body -> dados para criação ou alteração de registro

// MongoDB (não relacional)