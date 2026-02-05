<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const auswertungNumber = computed(() => {
  const path = route.path
  const match = path.match(/\/results\/(\d+)/)
  return match ? parseInt(match[1], 10) : 1
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Auswertung {{ auswertungNumber }}</h2>
    <p>Hier wird die Auswertung {{ auswertungNumber }} angezeigt.</p>
    <!-- Add your Auswertung {{ auswertungNumber }} content here -->
  </div>
</template>
