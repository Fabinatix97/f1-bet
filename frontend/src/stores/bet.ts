import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import type { BetData, MainBets, SideBets, StatementBets } from '@/types/bet'
import { teams } from '@/data/teams'

const STORAGE_KEY = 'f1-bet-store'
const BET_SUBMITTED_KEY = 'f1-bet-submitted'

const defaultMainBets: MainBets = {
  driverChampion: null,
  teamChampion: null,
}

const defaultSideBets: SideBets = {
  top3Drivers: [],
  top3Teams: [],
  firstRaceWinner: null,
  lastPlaceTeam: null,
  mostDNFsDriver: null,
  betterNewcomerTeam: null,
  betterDriverPerTeam: {},
}

const defaultStatementBets: StatementBets = {
  allTeamsAtLeast10Points: null,
  newTeamsPodium: null,
  multipleRaceWinners: null,
  fiveTeamsWinRaces: null,
  hulkWins: null,
  verstappenResignsOrTransfers: null,
}

export const useBetStore = defineStore('bet', () => {
  const betData = ref<BetData>({
    userName: '',
    mainBets: { ...defaultMainBets },
    sideBets: { ...defaultSideBets },
    statementBets: { ...defaultStatementBets },
  })

  const betSubmitted = ref(localStorage.getItem(BET_SUBMITTED_KEY) === 'true')

  const setBetSubmitted = (value: boolean) => {
    betSubmitted.value = value
    if (value) {
      localStorage.setItem(BET_SUBMITTED_KEY, 'true')
    } else {
      localStorage.removeItem(BET_SUBMITTED_KEY)
    }
  }

  // Computed getters for easier access (backward compatibility)
  const userName = computed({
    get: () => betData.value.userName,
    set: (value: string) => {
      betData.value.userName = value
    },
  })

  const selectedDriver = computed({
    get: () => betData.value.mainBets.driverChampion,
    set: (value: number | null) => {
      betData.value.mainBets.driverChampion = value
    },
  })

  const selectedTeam = computed({
    get: () => betData.value.mainBets.teamChampion,
    set: (value: number | null) => {
      betData.value.mainBets.teamChampion = value
    },
  })

  const selectedSideBetDrivers = computed({
    get: () => betData.value.sideBets.top3Drivers,
    set: (value: number[]) => {
      betData.value.sideBets.top3Drivers = value
    },
  })

  const selectedSideBetTeams = computed({
    get: () => betData.value.sideBets.top3Teams,
    set: (value: number[]) => {
      betData.value.sideBets.top3Teams = value
    },
  })

  const firstRaceWinner = computed({
    get: () => betData.value.sideBets.firstRaceWinner,
    set: (value: number | null) => {
      betData.value.sideBets.firstRaceWinner = value
    },
  })

  const lastPlaceTeam = computed({
    get: () => betData.value.sideBets.lastPlaceTeam,
    set: (value: number | null) => {
      betData.value.sideBets.lastPlaceTeam = value
    },
  })

  const mostDNFsDriver = computed({
    get: () => betData.value.sideBets.mostDNFsDriver,
    set: (value: number | null) => {
      betData.value.sideBets.mostDNFsDriver = value
    },
  })

  const betterNewcomerTeam = computed({
    get: () => betData.value.sideBets.betterNewcomerTeam,
    set: (value: number | null) => {
      betData.value.sideBets.betterNewcomerTeam = value
    },
  })

  const betterDriverPerTeam = computed(() => betData.value.sideBets.betterDriverPerTeam)

  const allTeamsAtLeast10Points = computed({
    get: () => betData.value.statementBets.allTeamsAtLeast10Points,
    set: (value: boolean | null) => {
      betData.value.statementBets.allTeamsAtLeast10Points = value
    },
  })

  const newTeamsPodium = computed({
    get: () => betData.value.statementBets.newTeamsPodium,
    set: (value: boolean | null) => {
      betData.value.statementBets.newTeamsPodium = value
    },
  })

  const multipleRaceWinners = computed({
    get: () => betData.value.statementBets.multipleRaceWinners,
    set: (value: boolean | null) => {
      betData.value.statementBets.multipleRaceWinners = value
    },
  })

  const fiveTeamsWinRaces = computed({
    get: () => betData.value.statementBets.fiveTeamsWinRaces,
    set: (value: boolean | null) => {
      betData.value.statementBets.fiveTeamsWinRaces = value
    },
  })

  const hulkWins = computed({
    get: () => betData.value.statementBets.hulkWins,
    set: (value: boolean | null) => {
      betData.value.statementBets.hulkWins = value
    },
  })

  const verstappenResignsOrTransfers = computed({
    get: () => betData.value.statementBets.verstappenResignsOrTransfers,
    set: (value: boolean | null) => {
      betData.value.statementBets.verstappenResignsOrTransfers = value
    },
  })

  // Load from localStorage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        // Migrate old format to new format if needed
        if (data.userName) betData.value.userName = data.userName
        if (data.selectedDriver !== undefined)
          betData.value.mainBets.driverChampion = data.selectedDriver
        if (data.selectedTeam !== undefined) betData.value.mainBets.teamChampion = data.selectedTeam
        if (data.selectedSideBetDrivers)
          betData.value.sideBets.top3Drivers = data.selectedSideBetDrivers
        if (data.selectedSideBetTeams) betData.value.sideBets.top3Teams = data.selectedSideBetTeams
        if (data.firstRaceWinner !== undefined)
          betData.value.sideBets.firstRaceWinner = data.firstRaceWinner
        if (data.lastPlaceTeam !== undefined)
          betData.value.sideBets.lastPlaceTeam = data.lastPlaceTeam
        if (data.mostDNFsDriver !== undefined)
          betData.value.sideBets.mostDNFsDriver = data.mostDNFsDriver
        if (data.betterNewcomerTeam !== undefined)
          betData.value.sideBets.betterNewcomerTeam = data.betterNewcomerTeam
        if (data.betterDriverPerTeam)
          betData.value.sideBets.betterDriverPerTeam = data.betterDriverPerTeam
        if (data.allTeamsAtLeast10Points !== undefined)
          betData.value.statementBets.allTeamsAtLeast10Points = data.allTeamsAtLeast10Points
        if (data.newTeamsPodium !== undefined)
          betData.value.statementBets.newTeamsPodium = data.newTeamsPodium
        if (data.multipleRaceWinners !== undefined)
          betData.value.statementBets.multipleRaceWinners = data.multipleRaceWinners
        if (data.fiveTeamsWinRaces !== undefined)
          betData.value.statementBets.fiveTeamsWinRaces = data.fiveTeamsWinRaces
        if (data.hulkWins !== undefined) betData.value.statementBets.hulkWins = data.hulkWins
        if (data.verstappenResignsOrTransfers !== undefined)
          betData.value.statementBets.verstappenResignsOrTransfers =
            data.verstappenResignsOrTransfers

        // Also check for new format
        if (data.mainBets) betData.value.mainBets = { ...defaultMainBets, ...data.mainBets }
        if (data.sideBets) betData.value.sideBets = { ...defaultSideBets, ...data.sideBets }
        if (data.statementBets)
          betData.value.statementBets = { ...defaultStatementBets, ...data.statementBets }
      }
    } catch (error) {
      console.error('Failed to load bet data from localStorage:', error)
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(betData.value))
    } catch (error) {
      console.error('Failed to save bet data to localStorage:', error)
    }
  }

  // Watch for changes and auto-save
  watch(
    betData,
    () => {
      saveToStorage()
    },
    { deep: true },
  )

  // Generic toggle helpers
  /**
   * Toggle a single selection (null or value)
   * Used for: driverChampion, teamChampion, firstRaceWinner, lastPlaceTeam, mostDNFsDriver, betterNewcomerTeam
   */
  const toggleSingleSelection = <T>(currentValue: T | null, newValue: T): T | null => {
    return currentValue === newValue ? null : newValue
  }

  /**
   * Toggle an array selection with max items limit
   * Used for: top3Drivers, top3Teams
   */
  const toggleArraySelection = <T>(array: T[], value: T, maxItems: number): void => {
    const index = array.indexOf(value)
    if (index > -1) {
      array.splice(index, 1)
    } else {
      if (array.length < maxItems) {
        array.push(value)
      }
    }
  }

  /**
   * Toggle a boolean statement (null, true, or false)
   * Used for: all statement bets
   */
  const toggleStatement = (currentValue: boolean | null, newValue: boolean): boolean | null => {
    return currentValue === newValue ? null : newValue
  }

  // Actions - Main Bets
  const setUserName = (name: string) => {
    betData.value.userName = name
  }

  const toggleSelectedDriver = (driverId: number) => {
    betData.value.mainBets.driverChampion = toggleSingleSelection(
      betData.value.mainBets.driverChampion,
      driverId,
    )
  }

  const toggleSelectedTeam = (teamId: number) => {
    betData.value.mainBets.teamChampion = toggleSingleSelection(
      betData.value.mainBets.teamChampion,
      teamId,
    )
  }

  // Actions - Side Bets
  const toggleSideBetDriver = (driverId: number) => {
    toggleArraySelection(betData.value.sideBets.top3Drivers, driverId, 2)
  }

  const toggleSideBetTeam = (teamId: number) => {
    toggleArraySelection(betData.value.sideBets.top3Teams, teamId, 2)
  }

  const toggleFirstRaceWinner = (driverId: number) => {
    betData.value.sideBets.firstRaceWinner = toggleSingleSelection(
      betData.value.sideBets.firstRaceWinner,
      driverId,
    )
  }

  const toggleLastPlaceTeam = (teamId: number) => {
    betData.value.sideBets.lastPlaceTeam = toggleSingleSelection(
      betData.value.sideBets.lastPlaceTeam,
      teamId,
    )
  }

  const toggleMostDNFsDriver = (driverId: number) => {
    betData.value.sideBets.mostDNFsDriver = toggleSingleSelection(
      betData.value.sideBets.mostDNFsDriver,
      driverId,
    )
  }

  const toggleBetterNewcomerTeam = (teamId: number) => {
    betData.value.sideBets.betterNewcomerTeam = toggleSingleSelection(
      betData.value.sideBets.betterNewcomerTeam,
      teamId,
    )
  }

  const setBetterDriverForTeam = (teamId: number, driverId: number) => {
    betData.value.sideBets.betterDriverPerTeam[teamId] = driverId
  }

  // Actions - Statement Bets
  const toggleAllTeamsAtLeast10Points = (value: boolean) => {
    betData.value.statementBets.allTeamsAtLeast10Points = toggleStatement(
      betData.value.statementBets.allTeamsAtLeast10Points,
      value,
    )
  }

  const toggleNewTeamsPodium = (value: boolean) => {
    betData.value.statementBets.newTeamsPodium = toggleStatement(
      betData.value.statementBets.newTeamsPodium,
      value,
    )
  }

  const toggleMultipleRaceWinners = (value: boolean) => {
    betData.value.statementBets.multipleRaceWinners = toggleStatement(
      betData.value.statementBets.multipleRaceWinners,
      value,
    )
  }

  const toggleFiveTeamsWinRaces = (value: boolean) => {
    betData.value.statementBets.fiveTeamsWinRaces = toggleStatement(
      betData.value.statementBets.fiveTeamsWinRaces,
      value,
    )
  }

  const toggleHulkWins = (value: boolean) => {
    betData.value.statementBets.hulkWins = toggleStatement(
      betData.value.statementBets.hulkWins,
      value,
    )
  }

  const toggleVerstappenResignsOrTransfers = (value: boolean) => {
    betData.value.statementBets.verstappenResignsOrTransfers = toggleStatement(
      betData.value.statementBets.verstappenResignsOrTransfers,
      value,
    )
  }

  // Utility functions
  const clearAll = () => {
    betData.value = {
      userName: '',
      mainBets: { ...defaultMainBets },
      sideBets: { ...defaultSideBets },
      statementBets: { ...defaultStatementBets },
    }
    betSubmitted.value = false
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(BET_SUBMITTED_KEY)
  }

  /**
   * Get bet data ready for API submission
   * This can be used when you're ready to send data to your backend
   */
  const getBetDataForAPI = (): BetData => {
    return {
      ...betData.value,
      submittedAt: new Date().toISOString(),
    }
  }

  /**
   * Check if all bets are completed
   */
  const isComplete = computed(() => {
    const allTeamsHaveBetterDriver = teams.every(
      (team) => betData.value.sideBets.betterDriverPerTeam[team.id] !== undefined,
    )

    return (
      betData.value.userName.trim() !== '' &&
      betData.value.mainBets.driverChampion !== null &&
      betData.value.mainBets.teamChampion !== null &&
      betData.value.sideBets.top3Drivers.length === 2 &&
      betData.value.sideBets.top3Teams.length === 2 &&
      betData.value.sideBets.firstRaceWinner !== null &&
      betData.value.sideBets.lastPlaceTeam !== null &&
      betData.value.sideBets.mostDNFsDriver !== null &&
      betData.value.sideBets.betterNewcomerTeam !== null &&
      allTeamsHaveBetterDriver &&
      betData.value.statementBets.allTeamsAtLeast10Points !== null &&
      betData.value.statementBets.newTeamsPodium !== null &&
      betData.value.statementBets.multipleRaceWinners !== null &&
      betData.value.statementBets.fiveTeamsWinRaces !== null &&
      betData.value.statementBets.hulkWins !== null &&
      betData.value.statementBets.verstappenResignsOrTransfers !== null
    )
  })

  // Load on store creation
  loadFromStorage()

  return {
    // Reactive state
    betData,
    betSubmitted,
    setBetSubmitted,
    // Computed getters (backward compatibility)
    userName,
    selectedDriver,
    selectedTeam,
    selectedSideBetDrivers,
    selectedSideBetTeams,
    firstRaceWinner,
    lastPlaceTeam,
    mostDNFsDriver,
    betterNewcomerTeam,
    betterDriverPerTeam,
    allTeamsAtLeast10Points,
    newTeamsPodium,
    multipleRaceWinners,
    fiveTeamsWinRaces,
    hulkWins,
    verstappenResignsOrTransfers,
    // Actions
    setUserName,
    toggleSelectedDriver,
    toggleSelectedTeam,
    toggleSideBetDriver,
    toggleSideBetTeam,
    toggleFirstRaceWinner,
    toggleLastPlaceTeam,
    toggleMostDNFsDriver,
    toggleBetterNewcomerTeam,
    setBetterDriverForTeam,
    toggleAllTeamsAtLeast10Points,
    toggleNewTeamsPodium,
    toggleMultipleRaceWinners,
    toggleFiveTeamsWinRaces,
    toggleHulkWins,
    toggleVerstappenResignsOrTransfers,
    // Utility functions
    clearAll,
    getBetDataForAPI,
    isComplete,
  }
})
