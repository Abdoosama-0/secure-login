const express = require('express')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser');
app.use(express.json())

app.use(cookieParser());

const loginRoute = require('./routes/loginRoute')
const connectdb = require('./database/connect')
require('dotenv').config()//to use the .env file

app.use(cors());

app.use('/api/v1/app', loginRoute)




//================================connect to the database=======================
const PORT = process.env.PORT || 3000
const connection = async () => {
    try {
        await connectdb(process.env.dbURI)
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }   }

    connection()
