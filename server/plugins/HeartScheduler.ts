import { useScheduler } from '#scheduler'
import { getUsers, updateUserHeart } from '~/server/data/users'

export default defineNitroPlugin(() => {
  startHeartScheduler()
})

function startHeartScheduler() {
  const scheduler = useScheduler()

  scheduler.run (() => {
    const users = getUsers()
      .then(async (users) => {
        for (const user of users) {
          if (user.remainedHeart < 20) {
            const result = await updateUserHeart(user.id, user.remainedHeart + 1)
            console.log(`update heart to ${user.name}`)
          }
        }
      }).finally(() => {
        console.log('heart scheduler finished')
      })
  }).cron('*/5 * * * *', 'Asia/Seoul')
}
