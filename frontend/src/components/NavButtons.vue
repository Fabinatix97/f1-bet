<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import BetOverviewDialog from '@/components/BetOverviewDialog.vue'

const props = withDefaults(
  defineProps<{
    selected: boolean
    showOverview?: boolean
    backRoute?: string
    nextRoute?: string
  }>(),
  {
    showOverview: true,
  },
)

const router = useRouter()
const showOverviewDialog = ref(false)

const handleContinue = () => {
  if (props.selected && props.nextRoute) {
    router.push(props.nextRoute)
  }
}

const handleBack = () => {
  if (props.backRoute) {
    router.push(props.backRoute)
  }
}
</script>

<template>
  <!-- Navigation Buttons -->
  <div class="fixed bottom-6 left-6 right-6 flex justify-between items-center z-50 gap-4">
    <!-- Back Button -->
    <button
      @click="handleBack"
      class="bg-[#5B5B92] py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center hover:bg-[#6B6BA2] transition-colors"
    >
      <Icon icon="mdi:arrow-left" class="text-2xl" />
      <div>Zurück</div>
    </button>

    <!-- Overview Button -->
    <button
      v-if="props.showOverview"
      @click="showOverviewDialog = true"
      class="bg-[#5B5B92] py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center hover:bg-[#6B6BA2] transition-colors"
    >
      <Icon icon="mdi:menu" class="text-2xl" />
    </button>

    <!-- Continue Button -->
    <button
      @click="handleContinue"
      :disabled="!props.selected || !props.nextRoute"
      :class="[
        'py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center transition-colors',
        props.selected
          ? 'bg-[#E10600] hover:bg-[#F11610]'
          : 'bg-[#373758] hover:bg-[#6B6BA2] text-slate-400 cursor-not-allowed',
        props.nextRoute ? '' : 'opacity-0 cursor-not-allowed',
      ]"
    >
      <div>Weiter</div>
      <Icon icon="mdi:arrow-right" class="text-2xl" />
    </button>
  </div>

  <BetOverviewDialog :is-open="showOverviewDialog" @close="showOverviewDialog = false" />
</template>
