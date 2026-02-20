<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBetStore } from '@/stores/bet';

const route = useRoute()
const betStore = useBetStore()

const userSet = computed(() => betStore.userName.trim().length > 0)

const isHomeActive = computed(
  () => route.path === '/' || route.path.startsWith('/explanation') || route.path.startsWith('/user-info')
)
const isMainBetActive = computed(
  () => route.path === '/mainbet' || route.path.startsWith('/mainbet/'),
)
const isSideBetActive = computed(
  () => route.path === '/sidebet' || route.path.startsWith('/sidebet/'),
)
const isResultsActive = computed(
  () => route.path === '/results' || route.path.startsWith('/results/'),
)

const activeIndex = computed(() => {
  if (isHomeActive.value) return 0
  if (isMainBetActive.value) return 1
  if (isSideBetActive.value) return 2
  if (isResultsActive.value) return 3
  return 0
})

</script>

<template>
<nav class="sticky top-0 z-40 bg-[#14141E] border-b-2 border-[#2D2D46]">
  <div class="relative grid grid-cols-4 justify-items-center py-2">
    <RouterLink to="/" :class="['text-sm flex flex-col items-center', isHomeActive ? 'text-slate-100' : 'text-[#8888B7]']">
      <Icon icon="material-symbols:home-outline-rounded" class="text-3xl" />
      Start
    </RouterLink>
    <RouterLink to="/mainbet" :class="['text-sm flex flex-col items-center', isMainBetActive ? 'text-slate-100' : 'text-[#8888B7]', userSet ? '' : 'disablelink']">
      <Icon icon="material-symbols:trophy-outline-rounded" class="text-3xl" />
      Hauptwette
    </RouterLink>
    <RouterLink to="/sidebet" :class="['text-sm flex flex-col items-center', isSideBetActive ? 'text-slate-100' : 'text-[#8888B7]', userSet ? '' : 'disablelink']">
      <Icon icon="material-symbols:checklist-rounded" class="text-3xl" />
      Nebenwette
    </RouterLink>
    <RouterLink to="/results" :class="['text-sm flex flex-col items-center', isResultsActive ? 'text-slate-100' : 'text-[#8888B7]']">
      <Icon icon="material-symbols:analytics-outline-rounded" class="text-3xl" />
      Auswertung
    </RouterLink>
    <div
      class="active-indicator"
      :style="{ left: `${activeIndex * 25}%` }"
    />
  </div>
</nav>
</template>

<style>
.disablelink {
    pointer-events: none;
}

.active-indicator {
    position: absolute;
    bottom: 0;
    width: 25%;
    display: flex;
    justify-content: center;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.active-indicator::after {
    content: '';
    width: 40%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background-color: white;
}
</style>
