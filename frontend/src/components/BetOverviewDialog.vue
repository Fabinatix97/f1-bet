<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBetStore } from '@/stores/bet'
import { teams } from '@/data/teams'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const betStore = useBetStore()
const router = useRouter()

// Define all bets
const bets = computed(() => [
  {
    id: 'driverChampion',
    label: 'Fahrerwertung',
    completed: betStore.selectedDriver !== null,
    route: '/mainbet/1',
  },
  {
    id: 'teamChampion',
    label: 'Teamwertung',
    completed: betStore.selectedTeam !== null,
    route: '/mainbet/2',
  },
  {
    id: 'top3Drivers',
    label: 'Top 3 Fahrer',
    completed: betStore.selectedSideBetDrivers.length === 2,
    route: '/sidebet/1',
  },
  {
    id: 'top3Teams',
    label: 'Top 3 Teams',
    completed: betStore.selectedSideBetTeams.length === 2,
    route: '/sidebet/2',
  },
  {
    id: 'firstRaceWinner',
    label: 'Erstes Rennen',
    completed: betStore.firstRaceWinner !== null,
    route: '/sidebet/3',
  },
  {
    id: 'lastPlaceTeam',
    label: 'Letzter Platz',
    completed: betStore.lastPlaceTeam !== null,
    route: '/sidebet/4',
  },
  {
    id: 'mostDNFsDriver',
    label: 'Meiste DNFs',
    completed: betStore.mostDNFsDriver !== null,
    route: '/sidebet/5',
  },
  {
    id: 'betterNewcomerTeam',
    label: 'Besseres Neulingsteam',
    completed: betStore.betterNewcomerTeam !== null,
    route: '/sidebet/6',
  },
  {
    id: 'allTeamsAtLeast10Points',
    label: 'Alle Teams ≥10 Pkt',
    completed: betStore.allTeamsAtLeast10Points !== null,
    route: '/sidebet/7',
  },
  {
    id: 'newTeamsPodium',
    label: 'Neue Teams Podium',
    completed: betStore.newTeamsPodium !== null,
    route: '/sidebet/7',
  },
  {
    id: 'multipleRaceWinners',
    label: 'Erstsieger',
    completed: betStore.multipleRaceWinners !== null,
    route: '/sidebet/7',
  },
  {
    id: 'fiveTeamsWinRaces',
    label: '5 Teams gewinnen',
    completed: betStore.fiveTeamsWinRaces !== null,
    route: '/sidebet/7',
  },
  {
    id: 'hulkWins',
    label: 'Hülk gewinnt',
    completed: betStore.hulkWins !== null,
    route: '/sidebet/7',
  },
  {
    id: 'verstappenResigns',
    label: 'Verstappen wechselt',
    completed: betStore.verstappenResignsOrTransfers !== null,
    route: '/sidebet/7',
  },
  {
    id: 'betterDriverPerTeam',
    label: 'Besserer Fahrer/Team',
    completed: teams.every((team) => betStore.betterDriverPerTeam[team.id] !== undefined),
    route: '/sidebet/8',
  },
])

// Calculate number of columns (4-5) based on number of bets
const gridColumns = computed(() => {
  const count = bets.value.length
  // Use 5 columns if we have 15+ bets, otherwise 4
  return count >= 15 ? 5 : 4
})

const handleClose = () => {
  emit('close')
}

const handleBetClick = (
  bet: { id: string; label: string; completed: boolean; route: string } | null,
) => {
  if (bet?.route) {
    router.push(bet.route)
    handleClose()
  }
}
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      @click="handleClose"
    >
      <!-- Dialog -->
      <div class="bg-[#2D2D46] rounded-2xl p-6 max-w-lg w-full shadow-2xl" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-slate-100">Übersicht</h2>
          <button
            @click="handleClose"
            class="text-slate-400 hover:text-slate-100 transition-colors"
          >
            <Icon icon="mdi:close" class="text-2xl" />
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="bet in bets"
            :key="bet.id"
            class="aspect-square flex items-center justify-center"
          >
            <button
              @click="handleBetClick(bet)"
              :class="[
                'w-full h-full rounded-lg flex items-center justify-center border-2 transition-colors cursor-pointer hover:scale-105 active:scale-95',
                bet.completed
                  ? 'bg-[#E10600] border-[#E10600] hover:bg-[#F11610]'
                  : 'bg-[#292941] border-[#5B5B92] hover:bg-[#353550]',
              ]"
              :title="bet.label"
            >
              <Icon v-if="bet.completed" icon="mdi:check" class="text-2xl text-slate-100" />
            </button>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-4 flex items-center justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-[#E10600] border-2 border-[#E10600]"></div>
            <span class="text-slate-300">Beantwortet</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-[#292941] border-2 border-[#5B5B92]"></div>
            <span class="text-slate-300">Offen</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
