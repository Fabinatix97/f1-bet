<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const lastPlaceTeam = computed(() => betStore.lastPlaceTeam)

const selectTeam = (teamId: number) => {
  betStore.toggleLastPlaceTeam(teamId)
}
</script>

<template>
  <h1>Welches Team wird den letzten Platz belegen?</h1>

  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="team in teams"
      :key="team.id"
      @click="selectTeam(team.id)"
      :class="[
        'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
        lastPlaceTeam === team.id ? '' : 'bg-[#292941] hover:bg-[#353550]',
      ]"
      :style="
        lastPlaceTeam === team.id ? { backgroundColor: team.color, border: '2px solid #FFF' } : {}
      "
    >
      <div class="text-slate-100 font-semibold">{{ team.name }}</div>
    </div>
  </div>

  <NavButtons :selected="lastPlaceTeam !== null" back-route="/sidebet/3" next-route="/sidebet/5" />
</template>
