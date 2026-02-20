import { ref } from 'vue'
import { defineStore } from 'pinia'

export type SnackbarType = 'success' | 'error'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const type = ref<SnackbarType>('success')
  const visible = ref(false)
  let hideTimeout: ReturnType<typeof setTimeout> | null = null

  function show(text: string, snackbarType: SnackbarType = 'success', durationMs = 4000) {
    if (hideTimeout) clearTimeout(hideTimeout)
    message.value = text
    type.value = snackbarType
    visible.value = true
    hideTimeout = setTimeout(() => {
      visible.value = false
      hideTimeout = null
    }, durationMs)
  }

  function hide() {
    if (hideTimeout) clearTimeout(hideTimeout)
    hideTimeout = null
    visible.value = false
  }

  return { message, type, visible, show, hide }
})
