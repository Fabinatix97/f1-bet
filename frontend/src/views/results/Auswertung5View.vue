<script setup lang="ts">
import { computed } from 'vue'
import { drivers } from '@/data/drivers'
import type { BetData } from '@/types/bet'
import { BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS } from 'chart.js'
import { barChartOptions } from '@/config/chartConfig'

const props = defineProps<{
  betData: BetData[]
}>()

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title)

const voteCounts = computed(() => {
  const counts = new Map<number, number>()

  props.betData.forEach((bet) => {
    const driverId = bet.sideBets.firstRaceWinner
    if (driverId !== null) {
      counts.set(driverId, (counts.get(driverId) || 0) + 1)
    }
  })

  return counts
})

const chartData = computed(() => {
  const labels: string[] = []
  const data: number[] = []

  drivers.forEach((driver) => {
    const count = voteCounts.value.get(driver.id) || 0
    if (count > 0) {
      labels.push(driver.abbreviation)
      data.push(count)
    }
  })

  return {
    labels,
    datasets: [
      {
        label: 'Anzahl',
        backgroundColor: '#E10600',
        data,
      },
    ],
  }
})

const tableData = computed(() => {
  const result: Array<{ driverName: string; users: string[]; count: number }> = []

  drivers.forEach((driver) => {
    const count = voteCounts.value.get(driver.id) || 0
    if (count > 0) {
      const users = props.betData
        .filter((bet) => bet.sideBets.firstRaceWinner === driver.id)
        .map((bet) => bet.userName)
      result.push({
        driverName: driver.name,
        users,
        count,
      })
    }
  })

  return result.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count
    }
    return a.driverName.localeCompare(b.driverName)
  })
})
</script>

<template>
  <div>
    <h2>Welcher Fahrer gewinnt das erste Rennen der Saison?</h2>
    <div class="h-96 mt-4">
      <Bar :data="chartData" :options="barChartOptions" />
    </div>

    <!-- Table showing user votes -->
    <div class="mt-6 overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-[#5B5B92]">
            <th class="text-left py-3 px-4 text-slate-100 font-bold">Fahrer</th>
            <th class="text-left py-3 px-4 text-slate-100 font-bold">Getippt von</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="row.driverName"
            :class="['border-b border-[#2D2D46]', index % 2 === 0 ? 'bg-[#2D2D46]/50' : '']"
          >
            <td class="py-3 px-4 text-slate-100">{{ row.driverName }}</td>
            <td class="py-3 px-4 text-slate-300">{{ row.users.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
