<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useBetStore } from '@/stores/bet'
import { useSnackbarStore } from '@/stores/snackbar'
import { submitBet } from '@/services/betApi'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const betStore = useBetStore()
const snackbar = useSnackbarStore()
const isSubmitting = ref(false)
const canSubmit = computed(() => betStore.isComplete && !betStore.betSubmitted)

const handleSubmit = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true

  try {
    await submitBet()
    betStore.clearAll()
    emit('close')
    snackbar.show('Erfolgreich abgeschickt', 'success')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fehler beim Absenden'
    snackbar.show(message, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  if (!isSubmitting.value) {
    emit('close')
  }
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      @click="handleClose"
    >
      <div class="bg-[#2D2D46] rounded-2xl p-6 max-w-md w-full shadow-2xl" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-white">Wette abschicken?</h2>
        </div>

        <div class="text-slate-300 text-sm">
          <p>
            Deine Wetten werden endgültig eingereicht und können danach nicht mehr geändert werden.
          </p>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="handleClose"
            :disabled="isSubmitting"
            class="flex-1 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 font-bold text-[#D0BCFF] transition-colors"
          >
            Abbrechen
          </button>
          <button
            @click="handleSubmit"
            :disabled="!canSubmit || isSubmitting"
            class="flex-1 py-3 px-4 font-bold text-[#D0BCFF] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isSubmitting" icon="mdi:loading" class="text-xl animate-spin" />
            <span v-else>Abschicken</span>
          </button>
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
