import { useScheduler } from '#scheduler'
import { getUsersWherePushEnabled, updateUserLastPushTime } from '~/server/data/users'
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
          const sendPushRatio = user.aimigoMbti.toUpperCase().startsWith('E') ? 0.8 : 0.5
          const sendPush = (Math.random() < sendPushRatio && token !== null)
          if (sendPush) {
            // send push
            const sendResult = await messaging.send(
              {
                token,
                notification: {
                  title: 'AIMIGO!',
                  body: getNotificationSentence(user.name),
                },
              },
            )
            await updateUserLastPushTime(user.id, new Date())
            console.log(`send push to ${user.name}`)
          }
        }
      }).finally(() => {
        console.log('push scheduler finished')
      })
  }).cron('0 */1 * * *', 'Asia/Seoul')
}
function getNotificationSentence(name: string): string {
  const sentences = [
    '{name}, 오늘 하루는 어땠어?',
    '{name}, 뭐해?',
    '{name}, 오늘도 화이팅!',
    '{name}, 날씨가 어때?',
    '{name}, 오늘 뭐 먹을까?',
    '{name}, 요즘 연락이 뜸하네..',
    '{name}, 자니?',
    '{name}님, 택배가 도착했습니다.',
    '{name}, 오늘 운동 너무 힘들었다..!',
    '{name}, 컨디션은 좀 어떄?',
    '{name}, 오늘도 고생했어!',
  ]

  const randomIndex = Math.floor(Math.random() * sentences.length)
  return sentences[randomIndex].replace('{name}', name)
}
