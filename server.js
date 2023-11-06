import express from 'express';
import bodyParser from 'body-parser';
import helmet from "helmet"
import cors from "cors"
import { connectDB } from './src/db/db.js';
import * as dotenv from 'dotenv'

dotenv.config()
connectDB()

const app = new express()

/**
 * importing middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(cors())

/**
 * importing routes
 */
import UserRoutes from './src/routes/users.js'

app.use('/api', UserRoutes)

app.get('/', (req,res) => {
    res.send({
        message: "Welcome to BurmeseFood API server"
    })
})


app.listen(process.env.PORT, () => {
    console.log('server is connected to', process.env.PORT)
})