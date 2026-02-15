<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const selectedTeam = computed(() => betStore.selectedTeam)

const selectTeam = (teamId: number) => {
  betStore.toggleSelectedTeam(teamId)
}
</script>

<template>
  <div class="flex justify-end">
    <div class="rounded-lg px-2 font-bold text-white bg-[#5B5B92]">
      20 p.
    </div>
  </div>

  <h1>Wer gewinnt die Teamwertung?</h1>

  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="team in teams"
      :key="team.id"
      @click="selectTeam(team.id)"
      :class="[
        'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
        selectedTeam === team.id ? '' : 'bg-[#292941] hover:bg-[#353550]',
      ]"
      :style="
        selectedTeam === team.id ? { backgroundColor: team.color, border: '2px solid #FFF' } : {}
      "
    >
      <div class="text-slate-100 font-semibold">{{ team.name }}</div>
    </div>
  </div>

  <NavButtons :selected="selectedTeam !== null" back-route="/mainbet/1" next-route="/sidebet" />
</template>
