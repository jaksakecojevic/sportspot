"use client"

import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "./LoadingDots"

import TextInput from "./inputs/TextInput"
import ImagesInput from "./inputs/ImagesInput"
import { Category, ImageType } from "@/types"
import DescriptionInput from "./inputs/DescriptionInput"
import PriceInput from "./inputs/PriceInput"
import SelectInput from "./inputs/SelectInput"
import { useRouter } from "next/navigation"
import { categoryOptions } from "@/tools/categoryOptions"
import { revalidatePath } from "next/cache"

export default function AddListingForm() {
    const { push, refresh } = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState<ImageType[]>([])
    const [priceAmount, setPriceAmount] = useState(0)
    const [currency, setCurrency] = useState("RSD")

    const [free, setFree] = useState(false)

    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")

    const [category, setCategory] = useState<Category>("all")

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [imagesError, setImagesError] = useState("")
    const [priceAmountError, setPriceAmountError] = useState("")

    const [cityError, setCityError] = useState("")
    const [streetError, setStreetError] = useState("")

    const [creationError, setCreationError] = useState("")

    const [loading, setLoading] = useState(false)

    function throwError(setError: Dispatch<SetStateAction<string>>, message: string, time = 3500) {
        setError(message)
        setTimeout(() => {
            setError("")
        }, time)
    }

    function isInvalid() {
        let hasErrors = false
        if (!title) {
            throwError(setTitleError, "Naslov je obavezno polje.")
            hasErrors = true
        }
        if (!description) {
            throwError(setDescriptionError, "Opis je obavezno polje.")
            hasErrors = true
        }
        if (images.length == 0) {
            throwError(setImagesError, "Bar 1 slika je obavezna.")
            hasErrors = true
        }
        if (!priceAmount) {
            throwError(setPriceAmountError, "Cena je obavezno polje.")
            hasErrors = true
        }
        if (!city) {
            throwError(setCityError, "Grad je obavezno polje.")
            hasErrors = true
        }
        if (!street) {
            throwError(setStreetError, "Ulica je obavezno polje.")
            hasErrors = true
        }

        return hasErrors
    }

    async function handleCreate() {
        if (isInvalid()) return

        setLoading(true)

        const res = await fetch("/api/create-listing", {
            method: "POST",
            body: JSON.stringify({ title, description, images, priceAmount, currency, city, street, category, free }),
        })

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            push("/nalog/objekti")
            refresh()
        } else {
            if (resBody.message) {
                throwError(setCreationError, resBody.message)
            } else {
                throwError(setCreationError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
        }
    }

    return (
        <div className="w-full flex justify-center items-center px-sideSpace py-4">
            <div className="w-full max-w-xl">
                <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col gap-4">
                    <h1 className="text-center text-2xl font-bold">Dodaj objekat</h1>
                    <TextInput value={title} setValue={setTitle} error={titleError} setError={setTitleError} label="Naslov" />

                    <DescriptionInput value={description} setValue={setDescription} error={descriptionError} setError={setDescriptionError} label="Opis objekta" />
                    <ImagesInput images={images} setImages={setImages} imagesError={imagesError} setImagesError={setImagesError} />
                    <PriceInput amount={priceAmount} setAmount={setPriceAmount} currency={currency} setCurrency={setCurrency} amountError={priceAmountError} setAmmountError={setPriceAmountError} free={free} setFree={setFree} label={"Cena po satu"} />

                    <div className="flex gap-2 w-full">
                        <TextInput value={city} setValue={setCity} error={cityError} setError={setCityError} label="Grad" />
                        <TextInput value={street} setValue={setStreet} error={streetError} setError={setStreetError} label="Ulica" />
                    </div>
                    <SelectInput value={category} setValue={setCategory} options={categoryOptions} label="Kategorija (opciono)" />

                    <button onClick={handleCreate} disabled={loading} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default active:brightness-90">
                        {loading ? <LoadingDots /> : "Objavi objekat"}
                    </button>
                    {creationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{creationError}</div> : ""}
                </div>
            </div>
        </div>
    )
}
