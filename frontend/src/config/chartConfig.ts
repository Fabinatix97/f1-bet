import type { ChartOptions } from 'chart.js'

export const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#8888B7',
        font: {
          weight: 600,
        },
      },
      grid: {
        color: '#2D2D46',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: '#8888B7',
        font: {
          weight: 600,
        },
      },
      grid: {
        color: '#2D2D46',
      },
    },
  },
}
