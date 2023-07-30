import { useScheduler } from '#scheduler'
import { getUsersWherePushEnabled } from '~/server/data/users'
import { messaging } from '~/server/utils/firebase'

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
      .then(async (users) => {
        console.log(users.length)
        for (const user of users) {
          const token = user.pushToken
          const sendPush = (Math.random() < 0.5 && token !== null)
          if (sendPush) {
            // send push
            const sendResult = await messaging.send(
              {
                token,
                notification: {
                  title: 'AIMIGO!',
                  body: '오늘의 뉴스를 확인해보세요!', // TODO: aimigo의 말로 바꾸기.
                },
              },
            )
            console.log(`send push to ${user.name}`)
          }
        }
      }).finally(() => {
        console.log('push scheduler finished')
      })
  }).cron('*/10 * 8-22 * * *', 'Asia/Seoul')
}
