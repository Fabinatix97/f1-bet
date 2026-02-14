<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import SubmitDialog from '@/components/SubmitDialog.vue'
import { useBetStore } from '@/stores/bet'

const route = useRoute()
const betStore = useBetStore()
const showSubmitDialog = ref(false)

const isMainBetActive = computed(
  () => route.path === '/mainbet' || route.path.startsWith('/mainbet/'),
)
const isSideBetActive = computed(
  () => route.path === '/sidebet' || route.path.startsWith('/sidebet/'),
)
const isResultsActive = computed(
  () => route.path === '/results' || route.path.startsWith('/results/'),
)

const handleSubmitClick = (e: Event) => {
  e.preventDefault()
  showSubmitDialog.value = true
}
</script>

<template>
  <nav class="sticky top-0 z-40 bg-transparent pt-4 pb-2">
    <div class="bg-[#2D2D46] rounded-full flex justify-between items-center font-bold text-sm">
      <RouterLink
        to="/mainbet"
        :class="[
          'px-4 py-2 rounded-full flex flex-col items-center transition-colors',
          isMainBetActive ? 'bg-[#E10600] text-slate-100' : 'text-[#8888B7] hover:text-slate-100',
        ]"
      >
        <Icon icon="mdi:trophy-outline" class="text-2xl" />
        Hauptwette
      </RouterLink>
      <RouterLink
        to="/sidebet"
        :class="[
          'px-4 py-2 rounded-full flex flex-col items-center transition-colors',
          isSideBetActive ? 'bg-[#E10600] text-slate-100' : 'text-[#8888B7] hover:text-slate-100',
        ]"
      >
        <Icon icon="mdi:order-checkbox-ascending" class="text-2xl" />
        Nebenwette
      </RouterLink>
      <RouterLink
        v-if="betStore.betSubmitted"
        to="/results"
        :class="[
          'px-4 py-2 rounded-full flex flex-col items-center transition-colors',
          isResultsActive ? 'bg-[#E10600] text-slate-100' : 'text-[#8888B7] hover:text-slate-100',
        ]"
      >
        <Icon icon="mdi:chart-box-outline" class="text-2xl" />
        Zur Auswertung
      </RouterLink>
      <button
        v-else
        @click="handleSubmitClick"
        :class="[
          'px-4 py-2 rounded-full flex flex-col items-center transition-colors',
          betStore.isComplete
            ? 'text-slate-100 pulse-animation'
            : 'text-[#8888B7] hover:text-slate-100',
        ]"
      >
        <Icon
          icon="mdi:send"
          :class="['text-2xl', betStore.isComplete ? 'bounce-animation' : '']"
        />
        Abschicken
      </button>
    </div>
  </nav>

  <SubmitDialog :is-open="showSubmitDialog" @close="showSubmitDialog = false" />
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-8px);
  }
}

.pulse-animation {
  animation: pulse 1s ease-in-out infinite;
}

.bounce-animation {
  animation: bounce 1s ease-in-out infinite;
}
</style>
