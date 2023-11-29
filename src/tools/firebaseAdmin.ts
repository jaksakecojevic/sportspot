import { cert, ServiceAccount } from "firebase-admin/app"
import serviceAccount from "./serviceAccount.json"
import * as admin from "firebase-admin"
import { getStorage } from "firebase-admin/storage"

if (admin.apps.length == 0) {
    admin.initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
        storageBucket: "sportspot-e558f.appspot.com",
    })
}
export const storage = getStorage()
