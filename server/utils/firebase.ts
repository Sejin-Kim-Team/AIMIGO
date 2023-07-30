import { cert, initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

const config = useRuntimeConfig()

// const firebaseConfig = {
//   type: 'service_account',
//   project_id: config.fcm.projectId,
//   private_key_id: config.fcm.privateKeyId,
//   private_key: config.fcm.privateKey.replace(/\\n/g, '\n'),
//   client_email: config.fcm.clientEmail,
//   client_id: config.fcm.clientId,
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url: config.fcm.certUrl,
//   universe_domain: 'googleapis.com',
// }

const adminApp = initializeApp({
  credential: cert({
    projectId: config.fcm.projectId,
    clientEmail: config.fcm.clientEmail,
    privateKey: config.fcm.privateKey,
  }),
})

export const messaging = getMessaging(adminApp)
