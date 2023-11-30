import deleteImage from "@/tools/deleteImage"
import getFile from "@/tools/getFile"
import uploadImages from "@/tools/uploadImages"
import { ImageType } from "@/types"
import { faImage, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction } from "react"

export default function ImagesInput({ images, setImages, imagesError, setImagesError }: { images: ImageType[]; setImages: Dispatch<SetStateAction<ImageType[]>>; imagesError: string; setImagesError: Dispatch<SetStateAction<string>> }) {
    async function handleImageAdd() {
        if (setImagesError) setImagesError("")

        const files = Array.from((await getFile("image/*", true)) as FileList) as File[]
        setImages((current) => {
            const loadingBlocks = files.map(() => {
                return { id: "$loading", url: "" }
            })
            const newImages = [...current, ...loadingBlocks]
            return newImages
        })
        const images = await uploadImages(files)
        setImages((current) => {
            const newImages = [...current, ...images].filter((image) => image.id != "$loading")
            return newImages
        })
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {images.map((image, index) => {
                    return <Image image={image} setImages={setImages} images={images} key={index} />
                })}
                <button onClick={handleImageAdd} className="w-full rounded-lg flex border-dashed flex-col justify-center items-center p-3 bg-light border-2 border-gray-200 aspect-square hover:bg-gray-300 transition-colors">
                    <FontAwesomeIcon icon={faImage} className="h-8 text-grayer" />
                    <p className="font-semibold">Dodaj sliku</p>
                </button>
            </div>
            {imagesError ? <p className="mt-2 font-semibold text-red-500">{imagesError}</p> : ""}
        </div>
    )
}

function Image({ image, setImages, images }: { image: ImageType; setImages: Dispatch<SetStateAction<ImageType[]>>; images: ImageType[] }) {
    function handleDelete() {
        setImages((current) => {
            const newImages = [...current].filter((n) => n.id != image.id)
            return newImages
        })
        deleteImage(image.id)
    }
    if (image.id == "$loading") return <LoadingBlock />
    return (
        <div style={{ backgroundImage: `url(${image.url})` }} className={`relative aspect-square draggable bg-contain bg-no-repeat bg-center rounded-lg border border-grayer bg-white `}>
            {images.length > 1 ? (
                <button onClick={handleDelete} className="bg-white rounded-lg shadow-primary flex justify-center items-center w-8 h-8 absolute bottom-2 right-2 hover:brightness-90 transition-filter">
                    <FontAwesomeIcon icon={faTrashCan} className="text-red-500 block" />
                </button>
            ) : (
                ""
            )}
        </div>
    )
}
function LoadingBlock() {
    return (
        <div draggable="false" className={`flex justify-center items-center font-semibold bg-gray-50 relative aspect-square draggable bg-contain bg-no-repeat bg-center rounded-lg border border-grayer bg-light`}>
            Uploaduje se..
        </div>
    )
}
