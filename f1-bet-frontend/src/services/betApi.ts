/**
 * Example API service for submitting bet data
 *
 * When you're ready to integrate with your backend API, you can:
 * 1. Rename this file to betApi.ts
 * 2. Update the API_BASE_URL
 * 3. Implement error handling as needed
 * 4. Call submitBet() from your components (e.g., after completing all bets)
 */

import { useBetStore } from '@/stores/bet'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

/**
 * Submit bet data to the backend API
 */
export async function submitBet(): Promise<void> {
  const betStore = useBetStore()
  const betData = betStore.getBetDataForAPI()

  try {
    const response = await fetch(`${API_BASE_URL}/bets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(betData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Bet submitted successfully:', result)
    return result
  } catch (error) {
    console.error('Failed to submit bet:', error)
    throw error
  }
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
