import express, { response } from "express"
import cors from "cors"
import mysql2 from "mysql2"
import "dotenv/config"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: process.env.HOST_BANCO,
    user: process.env.USUARIO_BANCO,
    password: process.env.SENHA_BANCO,
    database: process.env.NOME_BANCO
})

app.get("/", (request, response) => {
    const comandoSelect = "SELECT * FROM musicas_nicolas_macedo"

    sql.query(comandoSelect, (error, data) => {
        if(error){
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.listen(3001, () => {
    console.log("Servidor Online")
})

app.post("/cadastrar", (request, response) => {
    const { titulo, artista, genero, ano, duracao } = request.body;
    const comandoInsert = "INSERT INTO musicas_nicolas_macedo(titulo, artista, genero, ano, duracao) VALUES (?, ?, ?, ?, ?)"

    sql.query(comandoInsert, [titulo, artista, genero, ano, duracao], (error) => {
        if (error) {
            console.error("ERRO NO BANCO:", error);
            return response.status(500).json({ mensagem: "Erro ao salvar" })
        }

        
        return response.status(201).json({ mensagem: "Música cadastrada com sucesso!" })
    }); 
    
});

export default app