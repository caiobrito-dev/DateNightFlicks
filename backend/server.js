const express = require("express")
const mysql = require("mysql2")
const port = 3000
const cors = require('cors');

const app = express()
app.use(cors());


//Conexão com BD
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "date_night_flicks"
})

connection.connect(err => {
    if(err) return "Falha na conexão"
    console.log("Conexão bem sucedida")
})

app.get("/imagens", (req, res) => {
    connection.query("SELECT name, url FROM films", (err, result) => {
        if (err){
            res.status(500).send("Erro ao consultar banco de dados")
            return
        }
        res.json(result)
        console.log("FUNCIONOU")
    })
})

app.listen(port, () => {
    return `Server running on port ${port}`
})