import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.routes.js'
import { projectRouter } from './routes/projects.routes.js'

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api", projectRouter)

app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`)
})