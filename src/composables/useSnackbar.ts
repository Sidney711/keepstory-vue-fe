import { ref, computed } from 'vue'

export type SnackbarType = 'error' | 'success'

const snackbarVisible = ref(false)
const snackbarMessage = ref('')
const snackbarType = ref<SnackbarType>('error')

const snackbarColor = computed(() => {
  return snackbarType.value === 'success' ? 'green' : 'error'
})

export function useSnackbar() {
  function showSnackbar(message: string, type: SnackbarType = 'error') {
    snackbarMessage.value = message
    snackbarType.value = type
    snackbarVisible.value = true
  }

  return {
    snackbarVisible,
    snackbarMessage,
    snackbarColor,
    showSnackbar,
  }
}
