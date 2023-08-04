import { initializeApp } from 'firebase/app'
import type { Messaging } from 'firebase/messaging'

import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/shared'

export function useFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB0weP8vq3C9GBgRVUnkQYkBwXWY_HOr7I',
    authDomain: 'aimigo-83ddd.firebaseapp.com',
    projectId: 'aimigo-83ddd',
    storageBucket: 'aimigo-83ddd.appspot.com',
    messagingSenderId: '971619671165',
    appId: '1:971619671165:web:30cf8b5e8d9e4856de6514',
    measurementId: 'G-QMTN7RC4YM',
  }
  const firebaseApp = initializeApp(firebaseConfig)
  const messagingRef = shallowRef<Messaging | null>(null)
  const requestTokenRef = ref<string | null>(null)

  async function tryRequestPermission() {
    if (!window || !navigator || !Notification)
      return
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      console.log('Notification permission granted.')
      console.log(navigator.onLine)
      return true
    }
    else {
      console.log('Unable to get permission to notify.')
      alert('알림을 허용해주세요.')
      return false
    }
  }

  async function tryRequestToken() {
    const messaging = getMessaging()
    messagingRef.value = messaging

    const requestToken = await getToken(messaging, { vapidKey: 'BIUfNhBiY50v4ZzjRYOE4azoV7KAKpVtehBK0zAoXPvNsjD19m-C32CD_9H02DUlrIwAiz404-qLxcsAwbS3nI8' })
    requestTokenRef.value = requestToken

    onMessage(messagingRef.value, (payload) => {
      console.log('Message received. ', payload)
    })

  //   onMessage(messagingRef.value, (payload) => {
  //     console.log('Message received. ', payload)
  //     navigator.serviceWorker.ready.then((registration) => {
  //       if (!payload || !payload.notification || !payload.notification.title || !payload.notification.body)
  //         return
  //
  //       registration.showNotification(payload.notification.title, {
  //         body: payload.notification.body,
  //         icon: '/favicon.ico',
  //         vibrate: [200, 100, 200, 100, 200, 100, 200],
  //       }).finally(() => {
  //         console.log('Notification sent')
  //       })
  //     }).catch((err) => {
  //       console.log('ServiceWorker send failed: ', err)
  //     })
  //   })
  // }

  tryOnMounted(async () => {
    await tryRequestPermission()
    await tryRequestToken()
  })

  tryOnBeforeUnmount(() => {
    messagingRef.value = null
    requestTokenRef.value = null
  })

  return {
    firebaseApp,
    messaging: messagingRef,
    requestToken: requestTokenRef,
  }
}
