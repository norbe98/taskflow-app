import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.routes.js'

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`)
})