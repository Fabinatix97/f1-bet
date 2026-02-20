import { Router, type Request, type Response } from 'express'
import { getAllBets, saveBet } from '../store/betStore.js'
import type { BetData } from '../types/bet.js'

const router = Router()

function isValidBetData(body: unknown): body is BetData {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  if (typeof b.userName !== 'string') return false
  if (!b.mainBets || typeof b.mainBets !== 'object') return false
  if (!b.sideBets || typeof b.sideBets !== 'object') return false
  if (!b.statementBets || typeof b.statementBets !== 'object') return false
  if (b.submittedAt !== undefined && typeof b.submittedAt !== 'string') return false
  return true
}

/**
 * GET /api/bets – return all submitted bets
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const bets = await getAllBets()
    res.json(bets)
  } catch (err) {
    console.error('GET /api/bets error:', err)
    res.status(500).json({ error: 'Failed to load bets' })
  }
})

/**
 * POST /api/bets – submit or update a user bet
 */
router.post('/', async (req: Request, res: Response) => {
  if (!isValidBetData(req.body)) {
    return res.status(400).json({ error: 'Invalid bet data: userName, mainBets, sideBets, statementBets required' })
  }

  try {
    const result = await saveBet(req.body as BetData)
    res.status(201).json({
      message: 'Bet submitted successfully',
      created: result.created,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save bet'
    if (message.includes('required')) {
      return res.status(400).json({ error: message })
    }
    console.error('POST /api/bets error:', err)
    res.status(500).json({ error: 'Failed to save bet' })
  }
})

export default router
