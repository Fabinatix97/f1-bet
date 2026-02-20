<script setup lang="ts">
import { computed } from 'vue'
import type { BetData } from '@/types/bet'

const props = defineProps<{
  betData: BetData[]
}>()

const statementMapping = {
  allTeamsAtLeast10Points: {
    statement: 'Jedes Team holt in der gesamten Saison mindestens 10 Punkte.',
  },
  newTeamsPodium: {
    statement: 'Ein neues Team fährt mindestens einmal aufs Podium.',
  },
  multipleRaceWinners: {
    statement: 'Es gibt mehr als drei verschiedene Rennsieger.',
  },
  fiveTeamsWinRaces: {
    statement: 'Mindestens fünf Teams gewinnen ein Rennen.',
  },
  hulkWins: {
    statement: 'Hülkenberg gewinnt ein Rennen.',
  },
  verstappenResignsOrTransfers: {
    statement: 'Verstappen tritt zurück oder wechselt das Team.',
  },
} as const

type StatementKey = keyof typeof statementMapping

const groupedStatements = computed(() => {
  return (Object.keys(statementMapping) as StatementKey[]).map((key) => {
    const trueUsers: string[] = []
    const falseUsers: string[] = []

    props.betData.forEach((bet) => {
      const value = bet.statementBets[key]

      if (value === true) {
        trueUsers.push(bet.userName)
      } else {
        falseUsers.push(bet.userName)
      }
    })

    return {
      key,
      statement: statementMapping[key].statement,
      trueUsers,
      falseUsers,
    }
  })
})
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-slate-100">Wahr oder falsch?</h2>

    <div class="mt-6 space-y-6">
      <div
        v-for="item in groupedStatements"
        :key="item.key"
        class="rounded-lg overflow-hidden border-2 border-[#8888B7]"
      >
        <!-- Statement -->
        <div class="px-4 py-3 text-slate-100 font-bold bg-[#5B5B92]">
          {{ item.statement }}
        </div>

        <!-- Answers -->
        <div class="bg-[#292941] grid grid-cols-2 gap-4 p-4">
          <!-- TRUE -->
          <div class="bg-[#2D2D46] rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="text-slate-100 font-semibold">Wahr</div>
              <div class="px-3 py-1 rounded-full text-sm font-bold text-slate-100 bg-[#5B5B92]">
                {{ item.trueUsers.length }}
              </div>
            </div>

            <div class="text-slate-300 text-sm">
              {{ item.trueUsers.join(', ') }}
            </div>
          </div>

          <!-- FALSE -->
          <div class="bg-[#2D2D46] rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="text-slate-100 font-semibold">Falsch</div>
              <div class="px-3 py-1 rounded-full text-sm font-bold text-slate-100 bg-[#5B5B92]">
                {{ item.falseUsers.length }}
              </div>
            </div>

            <div class="text-slate-300 text-sm">
              {{ item.falseUsers.join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
