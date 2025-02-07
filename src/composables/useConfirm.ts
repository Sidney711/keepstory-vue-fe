import { ref } from 'vue'

const confirmVisible = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmConfirmText = ref('')
const confirmCancelText = ref('')

let resolveCallback: ((value: boolean) => void) | null = null

export function useConfirm() {
  function showConfirm(options: {
    title: string
    message: string
    confirmText: string
    cancelText: string
  }): Promise<boolean> {
    confirmTitle.value = options.title
    confirmMessage.value = options.message
    confirmConfirmText.value = options.confirmText
    confirmCancelText.value = options.cancelText
    confirmVisible.value = true

    return new Promise<boolean>((resolve) => {
      resolveCallback = resolve
    })
  }

  const onConfirm = () => {
    if (resolveCallback) {
      resolveCallback(true)
      resolveCallback = null
    }
    confirmVisible.value = false
  }

  const onCancel = () => {
    if (resolveCallback) {
      resolveCallback(false)
      resolveCallback = null
    }
    confirmVisible.value = false
  }

  return {
    confirmVisible,
    confirmTitle,
    confirmMessage,
    confirmConfirmText,
    confirmCancelText,
    showConfirm,
    onConfirm,
    onCancel,
  }
}
