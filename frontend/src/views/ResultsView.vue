<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBets } from '@/services/betApi'
import { getMockBets } from '@/data/mockBets'
import type { BetData } from '@/types/bet'
import Pagination from '@/components/Pagination.vue'

// Configuration: Change this number to match your total number of result views
const TOTAL_RESULTS = 10

const betData = ref<BetData[]>([])
const loadError = ref<string | null>(null)

onMounted(async () => {
  try {
    betData.value = await getBets()
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Failed to load bets'
    // Fallback to mock data when API is unavailable (e.g. dev without backend)
    betData.value = await getMockBets()
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col p-6">
    <main class="flex-1 mt-6">
      <!-- Content Area -->
      <div class="mb-24">
        <RouterView :bet-data="betData" />
      </div>
    </main>

    <Pagination :total-pages="TOTAL_RESULTS" route-pattern="/results" />
  </div>
</template>
