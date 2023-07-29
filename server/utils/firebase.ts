import { initializeApp } from '@firebase/app'
import { getMessaging, getToken } from '@firebase/messaging'

const config = useRuntimeConfig()
const fcmKey = config.api?.fcmKey as string

const fiebaseConfig = {}
const app = initializeApp(fiebaseConfig)
const messaging = getMessaging(app)
const token = await getToken(messaging, { vapidKey: fcmKey })
