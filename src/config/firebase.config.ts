import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import admin from 'firebase-admin'

const serviceAccount: string = readFileSync(
  join(resolve(), 'src', 'modules', 'auth', 'keys', 'firebase-private-key.json'),
  'utf-8',
)

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
})

export { admin }
