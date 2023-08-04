export default defineNuxtRouteMiddleware((to) => {
  const { status, getSession } = useAuth()
  const session = await getSession()
  console.log('fucking', toRaw(status.value), session)
})
