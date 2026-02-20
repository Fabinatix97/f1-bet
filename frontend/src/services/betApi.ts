/**
 * API service for bet submission and fetching results
 */

import { useBetStore } from '@/stores/bet'
import type { BetData } from '@/types/bet'

// Use relative /api in production (same origin); set VITE_API_BASE_URL=http://localhost:3000/api for local dev
const API_BASE_URL =
  typeof import.meta.env.VITE_API_BASE_URL === 'string' && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : '/api'

/**
 * Fetch all submitted bets (for results view)
 */
export async function getBets(): Promise<BetData[]> {
  const response = await fetch(`${API_BASE_URL}/bets`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = (body as { error?: string }).error || response.statusText
    throw new Error(message)
  }

  return response.json() as Promise<BetData[]>
}

/**
 * Submit bet data to the backend API
 */
export async function submitBet(): Promise<void> {
  const betStore = useBetStore()
  const betData = betStore.getBetDataForAPI()

  const response = await fetch(`${API_BASE_URL}/bets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(betData),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = (body as { error?: string }).error || response.statusText
    throw new Error(message)
  }

  const result = await response.json()
  console.log('Bet submitted successfully:', result)
  return result
}

/**
 * Delete a user's submitted bet
 */
export async function deleteBetByUserName(userName: string): Promise<{ deleted: boolean }> {
  const encoded = encodeURIComponent(userName.trim())
  const response = await fetch(`${API_BASE_URL}/bets/${encoded}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })

  if (response.status === 404) {
    const body = await response.json().catch(() => ({}))
    const message = (body as { error?: string }).error || 'No bet found for this user'
    throw new Error(message)
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = (body as { error?: string }).error || response.statusText
    throw new Error(message)
  }

  return response.json() as Promise<{ deleted: boolean }>
}

/**
 * Example: Submit bet when user completes all bets
 * You could call this from ResultsView or a completion screen
 */
export async function submitBetIfComplete(): Promise<boolean> {
  const betStore = useBetStore()

  if (!betStore.isComplete) {
    console.warn('Cannot submit: bets are not complete')
    return false
  }

  try {
    await submitBet()
    return true
  } catch (error) {
    console.error('Failed to submit bet:', error)
    return false
  }
}
