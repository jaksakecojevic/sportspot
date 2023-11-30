import { cert, ServiceAccount } from "firebase-admin/app"

import * as admin from "firebase-admin"
import { getStorage } from "firebase-admin/storage"
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
if (admin.apps.length == 0) {
    admin.initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
        storageBucket: "sportspot-e558f.appspot.com",
    })
}
export const storage = getStorage()
