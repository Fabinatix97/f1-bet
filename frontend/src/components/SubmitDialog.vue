<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useBetStore } from '@/stores/bet'
import { submitBet } from '@/services/betApi'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const betStore = useBetStore()
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)

const canSubmit = computed(() => betStore.isComplete)

const handleSubmit = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    await submitBet()
    submitSuccess.value = true
    // Close dialog after 2 seconds on success
    setTimeout(() => {
      emit('close')
      submitSuccess.value = false
    }, 2000)
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Fehler beim Absenden'
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  if (!isSubmitting.value) {
    emit('close')
    submitError.value = null
    submitSuccess.value = false
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
      <div class="bg-[#2D2D46] rounded-2xl p-6 max-w-md w-full shadow-2xl" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-slate-100">Wette abschicken</h2>
          <button
            v-if="!isSubmitting"
            @click="handleClose"
            class="text-slate-400 hover:text-slate-100 transition-colors"
          >
            <Icon icon="mdi:close" class="text-2xl" />
          </button>
        </div>

        <!-- Content -->
        <div class="space-y-4">
          <!-- Success Message -->
          <div v-if="submitSuccess" class="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <div class="flex items-center gap-2 text-green-400">
              <Icon icon="mdi:check-circle" class="text-2xl" />
              <span class="font-semibold">Erfolgreich abgeschickt!</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="submitError" class="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <div class="flex items-center gap-2 text-red-400">
              <Icon icon="mdi:alert-circle" class="text-2xl" />
              <span class="font-semibold">{{ submitError }}</span>
            </div>
          </div>

          <!-- Warning if incomplete -->
          <div
            v-if="!canSubmit && !submitSuccess"
            class="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-yellow-400">
              <Icon icon="mdi:alert" class="text-2xl" />
              <span class="font-semibold">Nicht alle Wetten sind ausgefüllt.</span>
            </div>
            <p class="text-slate-300 text-sm mt-2">
              Bitte vervollständige alle Wetten, bevor du abschickst.
            </p>
          </div>

          <!-- Info if complete -->
          <div v-if="canSubmit && !submitSuccess && !submitError" class="text-slate-300">
            <p>Möchtest du deine Wetten jetzt abschicken?</p>
            <p class="text-sm mt-2 text-slate-400">
              Dein Name: <span class="text-slate-200 font-semibold">{{ betStore.userName }}</span>
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-6">
          <button
            v-if="!submitSuccess"
            @click="handleClose"
            :disabled="isSubmitting"
            class="flex-1 bg-[#5B5B92] hover:bg-[#6B6BA2] disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 rounded-lg font-bold text-slate-100 transition-colors"
          >
            Abbrechen
          </button>
          <button
            @click="handleSubmit"
            :disabled="!canSubmit || isSubmitting || submitSuccess"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-bold text-slate-100 transition-colors flex items-center justify-center gap-2',
              canSubmit && !isSubmitting && !submitSuccess
                ? 'bg-[#E10600] hover:bg-[#F11610]'
                : 'bg-[#2D2D46] text-[#8888B7] cursor-not-allowed',
            ]"
          >
            <Icon v-if="isSubmitting" icon="mdi:loading" class="text-xl animate-spin" />
            <Icon v-else-if="submitSuccess" icon="mdi:check" class="text-xl" />
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
