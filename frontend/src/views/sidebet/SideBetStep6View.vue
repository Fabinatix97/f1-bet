<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const betterNewcomerTeam = computed(() => betStore.betterNewcomerTeam)

const selectTeam = (teamId: number) => {
  betStore.toggleBetterNewcomerTeam(teamId)
}
</script>

<template>
  <div class="flex justify-end">
    <div class="rounded-lg px-2 font-bold text-white bg-[#5B5B92]">
      2 p.
    </div>
  </div>

  <h1>Welches der beiden neuen Werksteams (Audi vs. Cadillac) holt mehr Punkte?</h1>

  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="team in teams.filter((t) => ['Audi', 'Cadillac'].includes(t.name))"
      :key="team.id"
      @click="selectTeam(team.id)"
      :class="[
        'p-4 rounded-lg h-28 flex flex-col justify-end items-start cursor-pointer transition-colors',
        betterNewcomerTeam === team.id ? '' : 'bg-[#292941] hover:bg-[#353550]',
      ]"
      :style="
        betterNewcomerTeam === team.id
          ? { backgroundColor: team.color, border: '2px solid #FFF' }
          : {}
      "
    >
      <div class="text-slate-100 font-semibold">{{ team.name }}</div>
    </div>
  </div>

  <NavButtons
    :selected="betterNewcomerTeam !== null"
    back-route="/sidebet/5"
    next-route="/sidebet/7"
  />
</template>
