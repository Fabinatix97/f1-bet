<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { drivers } from '@/data/drivers'
import type { BetData } from '@/types/bet'

const props = defineProps<{
  betData: BetData[]
}>()

// Get teams with their drivers
const teamsWithDrivers = computed(() => {
  return teams.map((team) => {
    const teamDrivers = drivers.filter((driver) => driver.teamId === team.id)
    return {
      ...team,
      drivers: teamDrivers,
    }
  })
})

// Calculate vote counts per driver per team
const teamDriverVotes = computed(() => {
  const result = new Map<number, Map<number, { count: number; users: string[] }>>()

  teams.forEach((team) => {
    const driverMap = new Map<number, { count: number; users: string[] }>()
    team.driverIds.forEach((driverId) => {
      driverMap.set(driverId, { count: 0, users: [] })
    })
    result.set(team.id, driverMap)
  })

  props.betData.forEach((bet) => {
    const betterDriverPerTeam = bet.sideBets.betterDriverPerTeam
    if (betterDriverPerTeam) {
      Object.entries(betterDriverPerTeam).forEach(([teamIdStr, driverId]) => {
        const teamId = Number(teamIdStr)
        const driverVotes = result.get(teamId)
        if (driverVotes) {
          const voteData = driverVotes.get(driverId)
          if (voteData) {
            voteData.count++
            voteData.users.push(bet.userName)
          }
        }
      })
    }
  })

  return result
})

// Get vote data for a specific team and driver
const getVoteData = (teamId: number, driverId: number) => {
  const teamVotes = teamDriverVotes.value.get(teamId)
  if (!teamVotes) return { count: 0, users: [] }
  return teamVotes.get(driverId) || { count: 0, users: [] }
}
</script>

<template>
  <div>
    <h2>Wer ist der bessere Fahrer in jedem Team?</h2>

    <div class="mt-6 space-y-6">
      <div
        v-for="team in teamsWithDrivers"
        :key="team.id"
        class="rounded-lg overflow-hidden border-2"
        :style="{ borderColor: team.color }"
      >
        <!-- Team Header -->
        <div
          class="px-4 py-3 text-slate-100 font-bold text-lg"
          :style="{ backgroundColor: team.color }"
        >
          {{ team.name }}
        </div>

        <!-- Drivers -->
        <div class="bg-[#292941] grid grid-cols-2 gap-4 p-4">
          <div
            v-for="driver in team.drivers"
            :key="driver.id"
            class="bg-[#2D2D46] rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-slate-100 font-semibold">{{ driver.name }}</div>
              <div
                class="px-3 py-1 rounded-full text-sm font-bold text-slate-100"
                :style="{ backgroundColor: team.color }"
              >
                {{ getVoteData(team.id, driver.id).count }}
              </div>
            </div>
            <div v-if="getVoteData(team.id, driver.id).users.length > 0" class="text-slate-300 text-sm">
              {{ getVoteData(team.id, driver.id).users.join(', ') }}
            </div>
            <div v-else class="text-slate-500 text-sm italic">
              Keine Stimmen
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
