<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const selectedTeams = computed(() => betStore.selectedSideBetTeams)

const isTeamSelected = (teamId: number) => {
  return selectedTeams.value.includes(teamId)
}

const selectTeam = (teamId: number) => {
  betStore.toggleSideBetTeam(teamId)
}
</script>

<template>
  <h1>Welche beiden anderen Teams schaffen es in die Top 3?</h1>

  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="team in teams"
      :key="team.id"
      @click="selectTeam(team.id)"
      :class="[
        'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
        isTeamSelected(team.id) ? '' : 'bg-[#292941] hover:bg-[#353550]',
      ]"
      :style="
        isTeamSelected(team.id) ? { backgroundColor: team.color, border: '2px solid #FFF' } : {}
      "
    >
      <div class="text-slate-100 font-semibold">{{ team.name }}</div>
    </div>
  </div>

  <NavButtons
    :selected="selectedTeams.length === 2"
    back-route="/sidebet/1"
    next-route="/sidebet/3"
  />
</template>
