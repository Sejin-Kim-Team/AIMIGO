export function useKSnackbar() {
  const snackbar = useSnackbar()

  function success(text: string) {
    snackbar.add({ type: 'success', text })
  }

  function error(text: string) {
    snackbar.add({ type: 'error', text })
  }

  function warning(text: string) {
    snackbar.add({ type: 'warning', text })
  }

  function info(text: string) {
    snackbar.add({ type: 'info', text })
  }

  return {
    success,
    error,
    warning,
    info,
  }
}
