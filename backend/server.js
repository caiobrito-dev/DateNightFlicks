const express = require("express")
const mysql = require("mysql2")
const path = require("path")
const port = 3000

const app = express()

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

const frontendDir = path.join(__dirname, "..", "frontend")

app.use(express.static(path.join(frontendDir, "public")));

app.get("/", (req, res) =>{
    res.sendFile(path.join(frontendDir, "index.html"))
})

app.listen(port, () => {
    return `Server running on port ${port}`
})