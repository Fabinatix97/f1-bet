<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
const { message, type, visible } = storeToRefs(snackbar)
</script>

<template>
  <!-- M3 Snackbar: bottom of screen, single line, optional icon, auto-dismiss -->
  <Transition name="snackbar">
    <div
      v-if="visible"
      role="status"
      aria-live="polite"
      class="fixed left-4 right-4 bottom-20 z-[60] flex items-center gap-3 min-h-14 px-4 py-3 rounded-md shadow-lg max-w-[600px] mx-auto bg-slate-100 text-[#14141E]"
    >
      <span class="text-sm font-medium flex-1">{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
