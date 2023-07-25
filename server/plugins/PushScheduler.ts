import { useScheduler } from '#scheduler'
import { getUsersWherePushEnabled } from '~/server/data/users'

export default defineNitroPlugin(() => {
  startPushScheduler()
})

function startPushScheduler() {
  const scheduler = useScheduler()

  scheduler.run (() => {
    console.log('push scheduler started')
    const today = new Date()
    const yesterday = new Date(today.setDate(today.getDate() - 1))
    const time = today.getHours()
    console.log(`today: ${today.toTimeString()}, yesterday: ${yesterday.toTimeString()}, time: ${time}`)
    const users = getUsersWherePushEnabled(yesterday, time)
      .then((users) => {
        console.log(users.length)
        users.forEach((user) => {
          const sendPush = Math.random() < 0.5
          if (sendPush) {
            // send push
            console.log(`send push to ${user.name}`)
          }
        })
      }).finally(() => {
        console.log('push scheduler finished')
      })
  }).cron('*/10 * 8-22 * * *', 'Asia/Seoul')
}
