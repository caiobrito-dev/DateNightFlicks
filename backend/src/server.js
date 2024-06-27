const express = require("express")
const mysql = require("mysql2")
const cors = require('cors');
const app = express()
require("dotenv").config()

const port = process.env.PORT


app.use(cors());

//Conexão com BD
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

connection.connect(err => {
    if(err) return "Falha na conexão"
    console.log("Conexão bem sucedida")
})

app.get("/imagens", (req, res) => {
    connection.query("SELECT name, url, genero, date, time FROM films", (err, result) => {
        if (err){
            res.status(500).send("Erro ao consultar banco de dados")
            return
        }
        res.json(result)
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    return `Server running on port ${port}`
})