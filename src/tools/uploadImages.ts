import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"

export default async function uploadImages(files: File[]) {
    const images = await Promise.all(
        files.map(async (file) => {
            const id = v4()
            const imageRef = ref(storage, `listingImages/${id}/${file.name}`)

            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef)
            return { url, id }
        })
    )
    return images
}
