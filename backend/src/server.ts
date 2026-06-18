import express from 'express'
import cors from 'cors'
import { AuthRouter } from './routes/auth.routes.js'

const app = express()
const PORT = 3000
app.use(cors())

app.use("/api/auth", AuthRouter)

app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`)
})