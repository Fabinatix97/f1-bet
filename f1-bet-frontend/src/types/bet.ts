/**
 * Type definitions for bet data
 * This structure is designed to be easily serializable for API calls
 */

export interface MainBets {
  driverChampion: number | null // Driver ID
  teamChampion: number | null // Team ID
}

export interface SideBets {
  top3Drivers: number[] // Array of exactly 2 driver IDs
  top3Teams: number[] // Array of exactly 2 team IDs
  firstRaceWinner: number | null // Driver ID
  lastPlaceTeam: number | null // Team ID
  mostDNFsDriver: number | null // Driver ID
  betterNewcomerTeam: number | null // Team ID
  betterDriverPerTeam: Record<number, number> // Map of teamId -> driverId (better driver in each team)
}

export interface StatementBets {
  allTeamsAtLeast10Points: boolean | null
  newTeamsPodium: boolean | null
  multipleRaceWinners: boolean | null
  fiveTeamsWinRaces: boolean | null
  hulkWins: boolean | null
  verstappenResignsOrTransfers: boolean | null
}

export interface BetData {
  userName: string
  mainBets: MainBets
  sideBets: SideBets
  statementBets: StatementBets
}

/**
 * Helper type for API submission
 * Converts null values to undefined for cleaner JSON serialization
 */
export type BetDataForAPI = Omit<BetData, 'userName'> & {
  userName: string
}
