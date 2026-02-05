<script setup lang="ts">
import { computed } from 'vue'
import { teams } from '@/data/teams'
import type { BetData } from '@/types/bet'

const props = defineProps<{
  betData: BetData[]
}>()

// Get Audi and Cadillac teams
const audiTeam = teams.find((t) => t.id === 9)!
const cadillacTeam = teams.find((t) => t.id === 10)!

const voteCounts = computed(() => {
  const counts = new Map<number, number>()

  props.betData.forEach((bet) => {
    const teamId = bet.sideBets.betterNewcomerTeam
    if (teamId !== null) {
      counts.set(teamId, (counts.get(teamId) || 0) + 1)
    }
  })

  return counts
})

const audiVotes = computed(() => voteCounts.value.get(9) || 0)
const cadillacVotes = computed(() => voteCounts.value.get(10) || 0)
const totalVotes = computed(() => audiVotes.value + cadillacVotes.value)

const audiPercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((audiVotes.value / totalVotes.value) * 100)
})

const cadillacPercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((cadillacVotes.value / totalVotes.value) * 100)
})

const audiUsers = computed(() => {
  return props.betData
    .filter((bet) => bet.sideBets.betterNewcomerTeam === 9)
    .map((bet) => bet.userName)
})

const cadillacUsers = computed(() => {
  return props.betData
    .filter((bet) => bet.sideBets.betterNewcomerTeam === 10)
    .map((bet) => bet.userName)
})
</script>

<template>
  <div>
    <h2>Welches der beiden neuen Werksteams (Audi vs. Cadillac) holt mehr Punkte?</h2>

    <!-- Team Cards -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <!-- Audi Card -->
      <div class="rounded-lg overflow-hidden border-2" :style="{ borderColor: audiTeam.color }">
        <div
          class="px-4 py-3 text-slate-100 font-bold text-lg"
          :style="{ backgroundColor: audiTeam.color }"
        >
          {{ audiTeam.name }}
        </div>
        <div class="p-4">
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-4xl font-bold text-slate-100">{{ audiVotes }}</span>
            <span class="text-slate-400 text-sm">von {{ totalVotes }}</span>
          </div>
          <div class="text-2xl font-bold mb-2" :style="{ color: audiTeam.lightColor }">
            {{ audiPercentage }}%
          </div>
          <div v-if="audiUsers.length > 0" class="mt-3 pt-3 border-t border-[#2D2D46]">
            <div class="text-slate-400 text-sm mb-1">Getippt von:</div>
            <div class="text-slate-200 text-sm">{{ audiUsers.join(', ') }}</div>
          </div>
          <div v-else class="mt-3 pt-3 border-t border-[#2D2D46]">
            <div class="text-slate-500 text-sm italic">Keine Stimmen</div>
          </div>
        </div>
      </div>

      <!-- VS Box -->
      <div class="flex items-center justify-center py-4 md:py-0">
        <div
          class="border-2 border-[#5B5B92] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
        >
          <span class="text-slate-100 font-bold text-lg md:text-xl">VS.</span>
        </div>
      </div>

      <!-- Cadillac Card -->
      <div class="rounded-lg overflow-hidden border-2" :style="{ borderColor: cadillacTeam.color }">
        <div
          class="px-4 py-3 text-slate-100 font-bold text-lg"
          :style="{ backgroundColor: cadillacTeam.color }"
        >
          {{ cadillacTeam.name }}
        </div>
        <div class="p-4">
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-4xl font-bold text-slate-100">{{ cadillacVotes }}</span>
            <span class="text-slate-400 text-sm">von {{ totalVotes }}</span>
          </div>
          <div class="text-2xl font-bold mb-2" :style="{ color: cadillacTeam.lightColor }">
            {{ cadillacPercentage }}%
          </div>
          <div v-if="cadillacUsers.length > 0" class="mt-3 pt-3 border-t border-[#2D2D46]">
            <div class="text-slate-400 text-sm mb-1">Getippt von:</div>
            <div class="text-slate-200 text-sm">{{ cadillacUsers.join(', ') }}</div>
          </div>
          <div v-else class="mt-3 pt-3 border-t border-[#2D2D46]">
            <div class="text-slate-500 text-sm italic">Keine Stimmen</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
