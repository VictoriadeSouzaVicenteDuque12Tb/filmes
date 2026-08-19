import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_geo_E_Vic"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.post("/create", (request, response) => {
    const { nome, gênero, duração, classificação } = request.body

    const insertCommand = "INSERT INTO filmes_geo_E_Vic(nome, gênero, duração, classificação ) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [nome, gênero, duração, classificação ], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme cadastrado com sucesso!"
            })
        }
    })
})

app.delete("/delete/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_geo_E_Vic WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })
})

app.put("/update/:id", (request, response) => {
    const { id } = request.params
    const { nome, gênero, duração, classificação  } = request.body

    const updateCommand = "UPDATE filmes_geo_E_Vic SET nome = ?, gênero = ?, duração = ?, classificação = ? WHERE id = ?"

    database.query(updateCommand, [nome, gênero, duração, classificação, id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme editado com sucesso!"
            })
        }
    })
})


const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

app.listen(3333, () => {
    console.log("Servidor online")
})