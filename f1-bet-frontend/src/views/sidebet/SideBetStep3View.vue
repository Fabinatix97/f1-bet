<script setup lang="ts">
import { computed } from 'vue'
import { drivers } from '@/data/drivers'
import { teams } from '@/data/teams'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const firstRaceWinner = computed(() => betStore.firstRaceWinner)

const getTeamColor = (driverId: number) => {
  const driver = drivers.find((d) => d.id === driverId)
  if (!driver) return '#292941'
  const team = teams.find((t) => t.id === driver.teamId)
  return team?.color || '#292941'
}

const selectDriver = (driverId: number) => {
  betStore.toggleFirstRaceWinner(driverId)
}
</script>

<template>
  <h1>Welcher Fahrer gewinnt das erste Rennen der Saison?</h1>

  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="driver in drivers"
      :key="driver.id"
      @click="selectDriver(driver.id)"
      :class="[
        'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
        firstRaceWinner === driver.id ? '' : 'bg-[#292941] hover:bg-[#353550]',
      ]"
      :style="
        firstRaceWinner === driver.id
          ? { backgroundColor: getTeamColor(driver.id), border: '2px solid #FFF' }
          : {}
      "
    >
      <div class="text-slate-100 font-semibold">{{ driver.name }}</div>
    </div>
  </div>

  <NavButtons
    :selected="firstRaceWinner !== null"
    back-route="/sidebet/2"
    next-route="/sidebet/4"
  />
</template>
