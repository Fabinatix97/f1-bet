/**
 * Mock bet data for development and testing
 * This simulates what you'll receive from your backend API
 * Use this to continue working on the results view while building the backend
 */

import type { BetData } from '@/types/bet'

export const mockBets: BetData[] = [
  {
    userName: 'Maxi',
    mainBets: {
      driverChampion: 1, // Max Verstappen
      teamChampion: 1, // Red Bull Racing
    },
    sideBets: {
      top3Drivers: [3, 5], // Charles Leclerc, Lando Norris
      top3Teams: [2, 3], // Ferrari, McLaren
      firstRaceWinner: 1, // Max Verstappen
      lastPlaceTeam: 11, // Haas
      mostDNFsDriver: 21, // Esteban Ocon
      betterNewcomerTeam: 9, // Audi
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 4, // Ferrari: Lewis Hamilton
        3: 5, // McLaren: Lando Norris
        4: 8, // Mercedes: George Russell
        5: 9, // Aston Martin: Fernando Alonso
        6: 11, // Alpine: Pierre Gasly
        7: 13, // Williams: Alexander Albon
        8: 15, // Racing Bulls: Liam Lawson
        9: 18, // Audi: Nico Hülkenberg
        10: 19, // Cadillac: Sergio Pérez
        11: 21, // Haas: Esteban Ocon
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: true,
      newTeamsPodium: true,
      multipleRaceWinners: true,
      fiveTeamsWinRaces: true,
      hulkWins: false,
      verstappenResignsOrTransfers: false,
      newTop4Team: false,
      defectsAtSeasonStart: false,
    },
  },
  {
    userName: 'Franziska',
    mainBets: {
      driverChampion: 3, // Charles Leclerc
      teamChampion: 2, // Ferrari
    },
    sideBets: {
      top3Drivers: [1, 5], // Max Verstappen, Lando Norris
      top3Teams: [1, 3], // Red Bull Racing, McLaren
      firstRaceWinner: 3, // Charles Leclerc
      lastPlaceTeam: 10, // Cadillac
      mostDNFsDriver: 22, // Oliver Bearman
      betterNewcomerTeam: 9, // Audi
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 3, // Ferrari: Charles Leclerc
        3: 5, // McLaren: Lando Norris
        4: 7, // Mercedes: Kimi Antonelli
        5: 9, // Aston Martin: Fernando Alonso
        6: 11, // Alpine: Pierre Gasly
        7: 14, // Williams: Carlos Sainz Jr.
        8: 15, // Racing Bulls: Liam Lawson
        9: 17, // Audi: Gabriel Bortoleto
        10: 20, // Cadillac: Valtteri Bottas
        11: 22, // Haas: Oliver Bearman
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: true,
      newTeamsPodium: false,
      multipleRaceWinners: true,
      fiveTeamsWinRaces: true,
      hulkWins: false,
      verstappenResignsOrTransfers: false,
      newTop4Team: false,
      defectsAtSeasonStart: false,
    },
  },
  {
    userName: 'Markus',
    mainBets: {
      driverChampion: 5, // Lando Norris
      teamChampion: 3, // McLaren
    },
    sideBets: {
      top3Drivers: [1, 3], // Max Verstappen, Charles Leclerc
      top3Teams: [1, 2], // Red Bull Racing, Ferrari
      firstRaceWinner: 5, // Lando Norris
      lastPlaceTeam: 11, // Haas
      mostDNFsDriver: 2, // Isack Hadjar
      betterNewcomerTeam: 10, // Cadillac
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 4, // Ferrari: Lewis Hamilton
        3: 5, // McLaren: Lando Norris
        4: 8, // Mercedes: George Russell
        5: 9, // Aston Martin: Fernando Alonso
        6: 12, // Alpine: Franco Colapinto
        7: 13, // Williams: Alexander Albon
        8: 16, // Racing Bulls: Arvid Lindblad
        9: 18, // Audi: Nico Hülkenberg
        10: 19, // Cadillac: Sergio Pérez
        11: 21, // Haas: Esteban Ocon
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: false,
      newTeamsPodium: true,
      multipleRaceWinners: true,
      fiveTeamsWinRaces: false,
      hulkWins: true,
      verstappenResignsOrTransfers: false,
      newTop4Team: false,
      defectsAtSeasonStart: false,
    },
  },
  {
    userName: 'Julia',
    mainBets: {
      driverChampion: 4, // Lewis Hamilton
      teamChampion: 2, // Ferrari
    },
    sideBets: {
      top3Drivers: [1, 5], // Max Verstappen, Lando Norris
      top3Teams: [1, 3], // Red Bull Racing, McLaren
      firstRaceWinner: 4, // Lewis Hamilton
      lastPlaceTeam: 8, // Racing Bulls
      mostDNFsDriver: 12, // Franco Colapinto
      betterNewcomerTeam: 9, // Audi
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 4, // Ferrari: Lewis Hamilton
        3: 6, // McLaren: Oscar Piastri
        4: 7, // Mercedes: Kimi Antonelli
        5: 9, // Aston Martin: Fernando Alonso
        6: 11, // Alpine: Pierre Gasly
        7: 13, // Williams: Alexander Albon
        8: 15, // Racing Bulls: Liam Lawson
        9: 18, // Audi: Nico Hülkenberg
        10: 19, // Cadillac: Sergio Pérez
        11: 21, // Haas: Esteban Ocon
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: true,
      newTeamsPodium: true,
      multipleRaceWinners: false,
      fiveTeamsWinRaces: true,
      hulkWins: false,
      verstappenResignsOrTransfers: true,
      newTop4Team: false,
      defectsAtSeasonStart: true,
    },
  },
  {
    userName: 'Fabian',
    mainBets: {
      driverChampion: 1, // Max Verstappen
      teamChampion: 1, // Red Bull Racing
    },
    sideBets: {
      top3Drivers: [3, 4], // Charles Leclerc, Lewis Hamilton
      top3Teams: [2, 4], // Ferrari, Mercedes
      firstRaceWinner: 1, // Max Verstappen
      lastPlaceTeam: 11, // Haas
      mostDNFsDriver: 16, // Arvid Lindblad
      betterNewcomerTeam: 10, // Cadillac
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 3, // Ferrari: Charles Leclerc
        3: 5, // McLaren: Lando Norris
        4: 8, // Mercedes: George Russell
        5: 9, // Aston Martin: Fernando Alonso
        6: 11, // Alpine: Pierre Gasly
        7: 14, // Williams: Carlos Sainz Jr.
        8: 15, // Racing Bulls: Liam Lawson
        9: 17, // Audi: Gabriel Bortoleto
        10: 19, // Cadillac: Sergio Pérez
        11: 21, // Haas: Esteban Ocon
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: true,
      newTeamsPodium: false,
      multipleRaceWinners: true,
      fiveTeamsWinRaces: true,
      hulkWins: false,
      verstappenResignsOrTransfers: false,
      newTop4Team: true,
      defectsAtSeasonStart: false,
    },
  },
  {
    userName: 'Daniel',
    mainBets: {
      driverChampion: 5, // Lando Norris
      teamChampion: 3, // McLaren
    },
    sideBets: {
      top3Drivers: [1, 3], // Max Verstappen, Charles Leclerc
      top3Teams: [1, 2], // Red Bull Racing, Ferrari
      firstRaceWinner: 5, // Lando Norris
      lastPlaceTeam: 10, // Cadillac
      mostDNFsDriver: 2, // Isack Hadjar
      betterNewcomerTeam: 9, // Audi
      betterDriverPerTeam: {
        1: 1, // Red Bull: Max Verstappen
        2: 3, // Ferrari: Charles Leclerc
        3: 5, // McLaren: Lando Norris
        4: 7, // Mercedes: Kimi Antonelli
        5: 9, // Aston Martin: Fernando Alonso
        6: 12, // Alpine: Franco Colapinto
        7: 13, // Williams: Alexander Albon
        8: 16, // Racing Bulls: Arvid Lindblad
        9: 18, // Audi: Nico Hülkenberg
        10: 20, // Cadillac: Valtteri Bottas
        11: 22, // Haas: Oliver Bearman
      },
    },
    statementBets: {
      allTeamsAtLeast10Points: true,
      newTeamsPodium: true,
      multipleRaceWinners: true,
      fiveTeamsWinRaces: true,
      hulkWins: true,
      verstappenResignsOrTransfers: false,
      newTop4Team: true,
      defectsAtSeasonStart: true,
    },
  },
]

/**
 * Helper function to use mock data in development
 * Replace your API call with this while building the backend
 */
export function getMockBets(): Promise<BetData[]> {
  return Promise.resolve(mockBets)
}
