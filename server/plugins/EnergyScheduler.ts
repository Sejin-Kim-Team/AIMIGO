import { useScheduler } from '#scheduler'
import { getUsers, updateUserAimigoEnergy } from '~/server/data/users'

export default defineNitroPlugin(() => {
  startEnergyScheduler()
})

function startEnergyScheduler() {
  const scheduler = useScheduler()

  scheduler.run (() => {
    const users = getUsers()
      .then(async (users) => {
        for (const user of users) {
          const { aimigoEnergy, aimigoMbti } = user
          if (aimigoEnergy < 100) {
            const isOutgoing = aimigoMbti !== null && aimigoMbti.toUpperCase().startsWith('E')
            const chargedEnergy = getChargedEnergy(isOutgoing, aimigoEnergy)
            const result = await updateUserAimigoEnergy(user.id, chargedEnergy)
            console.log(`charge energy to ${user.name}'s aimigo ${user.aimigoName}. ${aimigoEnergy} -> ${result.aimigoEnergy}`)
          }
        }
      }).finally(() => {
        console.log('energy scheduler finished')
      })
  }).cron('*/30 * * * *', 'Asia/Seoul')
}

function getChargedEnergy(isOutgoing: boolean, energy: number): number {
  const minimum = isOutgoing ? 1 : 0.5
  const maximum = isOutgoing ? 1.5 : 1
  const energeRatio = (Math.random() * (maximum - minimum)) + minimum
  return Math.min(Math.floor(energeRatio * 10) + energy, 100)
}
