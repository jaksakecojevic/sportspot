import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

export default async function uploadImages(files: File[]) {
    const urls = await Promise.all(
        files.map(async (file) => {
            const imageRef = ref(storage, `listingImages/${file.name}`)

            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef)
            return url
        })
    )
    return urls
}
