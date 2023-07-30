export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/login')
    return

  const { status, signIn } = useAuth()

  if (status.value === 'unauthenticated') {
    try {
      const success = await signIn()

      if (!success)
        return navigateTo(`/login?redirect=${to.path}`)
    }
    catch {
      return navigateTo(`/login?redirect=${to.path}`)
    }
  }

  await nextTick()
})
