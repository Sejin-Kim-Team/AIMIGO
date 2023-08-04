export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth()
  await getSession()
})
