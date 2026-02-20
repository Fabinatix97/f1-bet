<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import BetOverviewDialog from '@/components/BetOverviewDialog.vue'
import SubmitDialog from '@/components/SubmitDialog.vue'

const props = withDefaults(
  defineProps<{
    selected: boolean
    showOverview?: boolean
    backRoute?: string
    nextRoute?: string
    showFinishButton?: boolean
  }>(),
  {
    showOverview: true,
    showFinishButton: false,
  },
)

const router = useRouter()
const showOverviewDialog = ref(false)
const showSubmitDialog = ref(false)

const handleContinue = () => {
  if (props.showFinishButton) {
    showSubmitDialog.value = true
    return
  }
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
  <div class="fixed bottom-6 left-6 right-6 grid grid-cols-[1fr_auto_1fr] items-center z-50 gap-4">
    <button
      class="col-start-1 justify-self-start bg-[#5B5B92] py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center hover:bg-[#6B6BA2] transition-colors"
      @click="handleBack"
    >
      <Icon icon="mdi:arrow-left" class="text-2xl" />
      <div>Zurück</div>
    </button>

    <button
      v-if="props.showOverview"
      class="col-start-2 justify-self-center bg-[#5B5B92] py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center hover:bg-[#6B6BA2] transition-colors"
      @click="showOverviewDialog = true"
    >
      <Icon icon="mdi:menu" class="text-2xl" />
    </button>

    <button
      v-if="(props.showFinishButton && props.selected) || props.nextRoute"
      class="col-start-3 justify-self-end py-4 px-4 rounded-full font-bold text-slate-100 flex gap-1 items-center transition-colors"
      @click="handleContinue"
      :disabled="!props.showFinishButton && (!props.selected || !props.nextRoute)"
      :class="[
        props.selected
          ? 'bg-[#E10600] hover:bg-[#F11610]'
          : 'bg-[#373758] hover:bg-[#6B6BA2] text-slate-400 cursor-not-allowed',
        !props.showFinishButton && !props.nextRoute ? 'opacity-0 cursor-not-allowed' : '',
      ]"
    >
      <Icon v-if="!props.showFinishButton" icon="mdi:arrow-right" class="text-2xl" />
      <Icon v-else icon="mdi:check" class="text-2xl" />
      <div>{{ props.showFinishButton ? 'Fertig' : 'Weiter' }}</div>
    </button>
  </div>

  <BetOverviewDialog :is-open="showOverviewDialog" @close="showOverviewDialog = false" />
  <SubmitDialog :is-open="showSubmitDialog" @close="showSubmitDialog = false" />
</template>
