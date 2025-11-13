const mongoose = require('mongoose')
const app = require('./app') // importa src/app.js
require('dotenv').config()

//CREDENTIALS
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const PORT = process.env.PORT || 3000 

mongoose
.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.bw4tb0b.mongodb.net/?appName=Cluster0`
)
.then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Servidor rodando na porta ${PORT}`)
    })
    console.log("✅ Conectou ao banco!")
}).catch((err) => console.log("❌ Erro de conexão com o Banco: ", err))

