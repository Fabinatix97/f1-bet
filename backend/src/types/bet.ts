export interface MainBets {
  driverChampion: number | null
  teamChampion: number | null
}

export interface SideBets {
  top3Drivers: number[]
  top3Teams: number[]
  firstRaceWinner: number | null
  lastPlaceTeam: number | null
  mostDNFsDriver: number | null
  betterNewcomerTeam: number | null
  betterDriverPerTeam: Record<number, number>
}

export interface StatementBets {
  allTeamsAtLeast10Points: boolean | null
  newTeamsPodium: boolean | null
  multipleRaceWinners: boolean | null
  fiveTeamsWinRaces: boolean | null
  hulkWins: boolean | null
  verstappenResignsOrTransfers: boolean | null
  newTop4Team: boolean | null
  defectsAtSeasonStart: boolean | null
}

export interface BetData {
  userName: string
  mainBets: MainBets
  sideBets: SideBets
  statementBets: StatementBets
  submittedAt?: string
}
