<script setup lang="ts">
import { computed } from 'vue'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const betStore = useBetStore()

const statements = computed(() => [
  {
    id: 'allTeamsAtLeast10Points',
    text: 'Jedes Team holt in der gesamten Saison mindestens 10 Punkte.',
    value: betStore.allTeamsAtLeast10Points,
    toggle: (val: boolean) => betStore.toggleAllTeamsAtLeast10Points(val),
  },
  {
    id: 'newTeamsPodium',
    text: "Eines der neuen Teams (Audi und/oder Cadillac) fahren mindestens einmal auf's Podium.",
    value: betStore.newTeamsPodium,
    toggle: (val: boolean) => betStore.toggleNewTeamsPodium(val),
  },
  {
    id: 'multipleRaceWinners',
    text: 'Mindestens ein Fahrer wird zum ersten Mal in seiner F1-Karriere ein Rennen gewinnen.',
    value: betStore.multipleRaceWinners,
    toggle: (val: boolean) => betStore.toggleMultipleRaceWinners(val),
  },
  {
    id: 'fiveTeamsWinRaces',
    text: 'Es werden mindestens fünf verschiedene Teams Rennen gewinnen.',
    value: betStore.fiveTeamsWinRaces,
    toggle: (val: boolean) => betStore.toggleFiveTeamsWinRaces(val),
  },
  {
    id: 'hulkWins',
    text: 'Nico Hülkenberge gewinnt zum ersten Mal ein F1-Rennen und beendet damit seine sieglose Serie.',
    value: betStore.hulkWins,
    toggle: (val: boolean) => betStore.toggleHulkWins(val),
  },
  {
    id: 'verstappenResignsOrTransfers',
    text: 'Max Verstappen tritt während der Saison zurück oder wechselt zu einem anderen Team (z. B. weil der RBPT-Motor nicht konkurrenzfähig ist).',
    value: betStore.verstappenResignsOrTransfers,
    toggle: (val: boolean) => betStore.toggleVerstappenResignsOrTransfers(val),
  },
])

const allStatementsAnswered = computed(() => {
  return (
    betStore.allTeamsAtLeast10Points !== null &&
    betStore.newTeamsPodium !== null &&
    betStore.multipleRaceWinners !== null &&
    betStore.fiveTeamsWinRaces !== null &&
    betStore.hulkWins !== null &&
    betStore.verstappenResignsOrTransfers !== null
  )
})
</script>

<template>
  <div class="flex justify-end">
    <div class="rounded-lg px-2 font-bold text-white bg-[#5B5B92]">
      jeweils 2 p.
    </div>
  </div>

  <h1>Wahr oder falsch?</h1>

  <div v-for="statement in statements" :key="statement.id" class="mb-16">
    <h2>{{ statement.text }}</h2>

    <div class="flex bg-[#292941] rounded-lg p-1 mt-2">
      <button
        @click="statement.toggle(true)"
        :class="[
          'flex-1 py-4 px-6 rounded-md font-bold text-lg transition-all',
          statement.value === true
            ? 'bg-[#E10600] text-slate-100 shadow-lg'
            : 'text-slate-300 hover:text-slate-100',
        ]"
      >
        Wahr
      </button>
      <button
        @click="statement.toggle(false)"
        :class="[
          'flex-1 py-4 px-6 rounded-md font-bold text-lg transition-all',
          statement.value === false
            ? 'bg-[#E10600] text-slate-100 shadow-lg'
            : 'text-slate-300 hover:text-slate-100',
        ]"
      >
        Falsch
      </button>
    </div>
  </div>

  <NavButtons :selected="allStatementsAnswered" back-route="/sidebet/6" next-route="/sidebet/8" />
</template>
