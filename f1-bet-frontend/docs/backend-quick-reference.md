# Quick Reference: Key Code Patterns

## SQLite Database Connection

```typescript
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./bets.db', (err) => {
  if (err) {
    console.error('Error opening database:', err)
  } else {
    console.log('Connected to SQLite database')
  }
})
```

## Inserting Bet Data

```typescript
// Convert BetData to database format
const insertBet = (betData: BetData) => {
  db.run(
    `INSERT INTO bets (
      user_name, driver_champion_id, team_champion_id,
      top3_driver_ids, better_driver_per_team
    ) VALUES (?, ?, ?, ?, ?)`,
    [
      betData.userName,
      betData.mainBets.driverChampion,
      betData.mainBets.teamChampion,
      JSON.stringify(betData.sideBets.top3Drivers), // Array → JSON string
      JSON.stringify(betData.sideBets.betterDriverPerTeam) // Object → JSON string
    ],
    function(err) {
      if (err) {
        console.error('Error inserting bet:', err)
      } else {
        console.log('Bet inserted with ID:', this.lastID)
      }
    }
  )
}
```

## Reading Bet Data

```typescript
// Convert database row back to BetData format
const getAllBets = (callback: (bets: BetData[]) => void) => {
  db.all('SELECT * FROM bets', [], (err, rows) => {
    if (err) {
      console.error('Error reading bets:', err)
      callback([])
      return
    }
    
    const bets: BetData[] = rows.map((row: any) => ({
      userName: row.user_name,
      mainBets: {
        driverChampion: row.driver_champion_id,
        teamChampion: row.team_champion_id,
      },
      sideBets: {
        top3Drivers: JSON.parse(row.top3_driver_ids || '[]'), // JSON string → Array
        top3Teams: JSON.parse(row.top3_team_ids || '[]'),
        betterDriverPerTeam: JSON.parse(row.better_driver_per_team || '{}'), // JSON string → Object
        // ... other fields
      },
      statementBets: {
        allTeamsAtLeast10Points: row.all_teams_at_least_10_points === 1 ? true : 
                                 row.all_teams_at_least_10_points === 0 ? false : null,
        // ... other boolean fields
      }
    }))
    
    callback(bets)
  })
}
```

## Express Route Handler

```typescript
import express from 'express'
const app = express()

app.use(express.json()) // Parse JSON bodies
app.use(cors()) // Allow frontend to call API

app.post('/api/bets', (req, res) => {
  const betData: BetData = req.body
  
  // Validate data here
  if (!betData.userName) {
    return res.status(400).json({ error: 'userName is required' })
  }
  
  // Insert into database
  insertBet(betData)
  
  res.status(201).json({ message: 'Bet submitted successfully' })
})

app.get('/api/bets', (req, res) => {
  getAllBets((bets) => {
    res.json(bets)
  })
})
```

## TypeScript Types for Database

```typescript
// Database row type (what you get from SQLite)
interface BetRow {
  id: number
  user_name: string
  driver_champion_id: number | null
  team_champion_id: number | null
  top3_driver_ids: string // JSON string
  better_driver_per_team: string // JSON string
  all_teams_at_least_10_points: number | null // 0, 1, or NULL
  // ... other fields
}

// Convert function
function rowToBetData(row: BetRow): BetData {
  return {
    userName: row.user_name,
    mainBets: {
      driverChampion: row.driver_champion_id,
      teamChampion: row.team_champion_id,
    },
    sideBets: {
      top3Drivers: JSON.parse(row.top3_driver_ids || '[]'),
      betterDriverPerTeam: JSON.parse(row.better_driver_per_team || '{}'),
      // ...
    },
    // ...
  }
}
```

## Common SQLite Patterns

```typescript
// Using promises (better for async/await)
import { promisify } from 'util'

const dbRun = promisify(db.run.bind(db))
const dbAll = promisify(db.all.bind(db))
const dbGet = promisify(db.get.bind(db))

// Now you can use async/await
async function insertBetAsync(betData: BetData) {
  try {
    await dbRun(
      'INSERT INTO bets (user_name, ...) VALUES (?, ...)',
      [betData.userName, ...]
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
```

## Environment Variables

```typescript
// Install: npm install dotenv
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const DB_PATH = process.env.DB_PATH || './bets.db'
```
