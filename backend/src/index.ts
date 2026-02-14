import express from 'express'
import cors from 'cors'
import betsRouter from './routes/bets.js'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())

app.use('/api/bets', betsRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`F1 Bet API listening on http://localhost:${port}`)
  console.log(`  POST /api/bets – submit bet`)
  console.log(`  GET  /api/bets – get all bets (results)`)
})
