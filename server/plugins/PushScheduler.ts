import { useScheduler } from '#scheduler'
import { getUsersWherePushEnabled, updateUserLastPushTime } from '~/server/data/users'
import { messaging } from '~/server/utils/firebase'

export default defineNitroPlugin(() => {
  startPushScheduler()
})

const useEnergy = (energy: number) => energy - 30
function startPushScheduler() {
  const scheduler = useScheduler()

  scheduler.run (() => {
    console.log('push scheduler started')
    const today = new Date()
    const time = today.getHours() === 0 ? 24 : today.getHours()

    const users = getUsersWherePushEnabled(time)
      .then(async (users) => {
        console.log(users.length)
        for (const user of users) {
          const token = user.pushToken
          const mbti = user.aimigoMbti
          const usedEnergy = useEnergy(user.aimigoEnergy)

          const sendPushRatio = mbti !== null && mbti.toUpperCase().startsWith('E') ? 0.5 : 0.3
          const sendPush = (Math.random() < sendPushRatio && token !== null)
          console.log(`send push: ${sendPush}, usedEnergy: ${usedEnergy}, token: ${token}`)
          if (sendPush && usedEnergy >= 0 && token !== null && token !== '') {
            const sendResult = await messaging.send(
              {
                token,
                data: {
                  title: 'AIMIGO!',
                  body: getNotificationSentence(user.name),
                },
              },
            ).catch((err) => {
              console.log(err)
            })
            await updateUserLastPushTime(user.id, new Date(), usedEnergy)
            console.log(`send push to ${user.name}, remain energy: ${usedEnergy}`)
          }
        }
      }).finally(() => {
        console.log('push scheduler finished')
      })
  }).cron('*/10 * * * *', 'Asia/Seoul')
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
    '{name}, 심심해',
    '{name}, 저녁 메뉴 추천좀',
    '{name}, 이 노래 들어봤어?',
    '{name}, 커피타임?',
  ]

  const randomIndex = Math.floor(Math.random() * sentences.length)
  return sentences[randomIndex].replace('{name}', name)
}
