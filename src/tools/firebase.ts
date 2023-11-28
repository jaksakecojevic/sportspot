import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCjIGudu7qRmOwHDlehlipdSJfFP4c21M0",
    authDomain: "sportspot-e558f.firebaseapp.com",
    projectId: "sportspot-e558f",
    storageBucket: "sportspot-e558f.appspot.com",
    messagingSenderId: "70198896201",
    appId: "1:70198896201:web:9a62d0d2ae170f32b70198",
    measurementId: "G-PQ0N4T526T",
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
