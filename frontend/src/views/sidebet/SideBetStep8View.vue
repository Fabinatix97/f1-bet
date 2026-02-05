<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { drivers } from '@/data/drivers'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const betterDriverPerTeam = computed(() => betStore.betterDriverPerTeam)

// Get drivers for each team
const teamsWithDrivers = computed(() => {
  return teams.map((team) => {
    const teamDrivers = drivers.filter((driver) => driver.teamId === team.id)
    return {
      ...team,
      drivers: teamDrivers,
    }
  })
})

// Check if all teams have a selection
const allTeamsSelected = computed(() => {
  return teams.every((team) => betterDriverPerTeam.value[team.id] !== undefined)
})

const getSelectedDriverForTeam = (teamId: number): number | null => {
  return betterDriverPerTeam.value[teamId] || null
}

const selectDriver = (teamId: number, driverId: number) => {
  betStore.setBetterDriverForTeam(teamId, driverId)
}
</script>

<template>
  <h1>Wer ist der bessere Fahrer in jedem Team?</h1>

  <div class="space-y-6">
    <div v-for="team in teamsWithDrivers" :key="team.id" class="space-y-3">
      <h2 :style="{ color: team.lightColor }">
        {{ team.name }}
      </h2>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="driver in team.drivers"
          :key="driver.id"
          @click="selectDriver(team.id, driver.id)"
          :class="[
            'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
            getSelectedDriverForTeam(team.id) === driver.id
              ? ''
              : 'bg-[#292941] hover:bg-[#353550]',
          ]"
          :style="
            getSelectedDriverForTeam(team.id) === driver.id
              ? { backgroundColor: team.color, border: '2px solid #FFF' }
              : {}
          "
        >
          <div class="text-slate-100 font-semibold">{{ driver.name }}</div>
        </div>
      </div>
    </div>
  </div>

  <NavButtons :selected="allTeamsSelected" back-route="/sidebet/7" />
</template>
