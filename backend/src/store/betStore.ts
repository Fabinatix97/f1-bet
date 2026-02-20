import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import type { BetData } from '../types/bet.js'

const DEFAULT_PATH = join(process.cwd(), 'data', 'bets.json')

function getDataPath(): string {
  return process.env.BETS_DATA_PATH || DEFAULT_PATH
}

async function ensureDataDir(): Promise<void> {
  const filePath = getDataPath()
  const dir = join(filePath, '..')
  await mkdir(dir, { recursive: true })
}

async function readBetsFile(): Promise<BetData[]> {
  try {
    const path = getDataPath()
    const raw = await readFile(path, 'utf-8')
    const data = JSON.parse(raw) as BetData[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeBetsFile(bets: BetData[]): Promise<void> {
  await ensureDataDir()
  const path = getDataPath()
  await writeFile(path, JSON.stringify(bets, null, 2), 'utf-8')
}

export async function getAllBets(): Promise<BetData[]> {
  return readBetsFile()
}

export async function saveBet(bet: BetData): Promise<{ created: boolean }> {
  const bets = await readBetsFile()
  const normalizedUserName = bet.userName.trim()
  if (!normalizedUserName) {
    throw new Error('userName is required')
  }

  const index = bets.findIndex(
    (b) => b.userName.trim().toLowerCase() === normalizedUserName.toLowerCase()
  )

  const toSave: BetData = {
    ...bet,
    userName: normalizedUserName,
  }

  if (index >= 0) {
    bets[index] = toSave
    await writeBetsFile(bets)
    return { created: false }
  }

  bets.push(toSave)
  await writeBetsFile(bets)
  return { created: true }
}

export async function deleteBetByUserName(userName: string): Promise<{ deleted: boolean }> {
  const normalized = userName.trim()
  if (!normalized) {
    throw new Error('userName is required')
  }

  const bets = await readBetsFile()
  const index = bets.findIndex(
    (b) => b.userName.trim().toLowerCase() === normalized.toLowerCase()
  )

  if (index < 0) {
    return { deleted: false }
  }

  bets.splice(index, 1)
  await writeBetsFile(bets)
  return { deleted: true }
}
