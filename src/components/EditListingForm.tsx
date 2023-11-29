"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import LoadingDots from "./LoadingDots"

import TextInput from "./inputs/TextInput"
import ImagesInput from "./ImagesInput"
import { Category, ImageType, Listing } from "@/types"
import PriceInput from "./inputs/PriceInput"
import DescriptionInput from "./inputs/DescriptionInput"
import SelectInput from "./inputs/SelectInput"
import { categoryOptions } from "@/tools/categoryOptions"
import FormButton from "./inputs/FormButton"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

function throwError(setError: Dispatch<SetStateAction<string>>, message: string, time = 3500) {
    setError(message)
    setTimeout(() => {
        setError("")
    }, time)
}

export default function EditListingForm(props: { listing: Listing }) {
    const [listing, setListing] = useState(props.listing)
    const [title, setTitle] = useState(listing.title)
    const [description, setDescription] = useState(listing.description)
    const [images, setImages] = useState<ImageType[]>(listing.images)
    const [priceAmount, setPriceAmount] = useState(listing.pricePerHour.amount)
    const [currency, setCurrency] = useState(listing.pricePerHour.currency)

    const [free, setFree] = useState(false)

    const [city, setCity] = useState(listing.address.city)
    const [street, setStreet] = useState(listing.address.street)

    const [category, setCategory] = useState<Category>(listing.category as Category)

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [imagesError, setImagesError] = useState("")
    const [priceAmountError, setPriceAmountError] = useState("")

    const [cityError, setCityError] = useState("")
    const [streetError, setStreetError] = useState("")

    const [creationError, setCreationError] = useState("")

    const [message, setMessage] = useState("")

    const [changesMade, setChangesMade] = useState(false)

    const [loading, setLoading] = useState(false)

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

    async function handleUpdate() {
        if (isInvalid()) return

        setLoading(true)

        const res = await fetch("/api/update-listing", {
            method: "POST",
            body: JSON.stringify({ listingId: listing._id, title, description, images, priceAmount, currency, city, street, category, free }),
        })

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            throwError(setMessage, "Izmene uspešno sačuvane.")
            equalizeInputs()
        } else {
            if (resBody.message) {
                throwError(setCreationError, resBody.message)
            } else {
                throwError(setCreationError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
        }
    }

    function sameImagesArray(array1: ImageType[], array2: ImageType[]) {
        return array1.every((value, index) => {
            return array2[index] && value.id == array2[index].id
        })
    }

    useEffect(() => {
        if (title != listing.title || description != listing.description || !sameImagesArray(images, listing.images) || priceAmount != listing.pricePerHour.amount || currency != listing.pricePerHour.currency || city != listing.address.city || street != listing.address.street || category != listing.category) {
            setChangesMade(true)
        } else {
            setChangesMade(false)
        }
    }, [title, description, images, priceAmount, currency, city, street, category, listing])

    function equalizeInputs() {
        setListing((current) => {
            const newPricePerHour = {
                amount: priceAmount,
                currency,
            }
            const newAddress = {
                city,
                street,
            }
            const newListing = { ...current, ...{ title, description, images, pricePerHour: newPricePerHour, address: newAddress, category, free } }

            return newListing
        })
    }

    return (
        <div className="w-full flex justify-center">
            <div className="rounded-lg flex flex-col gap-4 w-full">
                <h1 className="text-center text-2xl font-bold">Izmeni objekat</h1>
                <TextInput value={title} setValue={setTitle} error={titleError} setError={setTitleError} label="Naslov" />

                <DescriptionInput value={description} setValue={setDescription} error={descriptionError} setError={setDescriptionError} label="Opis objekta" />
                <ImagesInput images={images} setImages={setImages} imagesError={imagesError} setImagesError={setImagesError} />
                <PriceInput amount={priceAmount} setAmount={setPriceAmount} currency={currency} setCurrency={setCurrency} amountError={priceAmountError} setAmmountError={setPriceAmountError} free={free} setFree={setFree} label={"Cena po satu"} />

                <div className="flex gap-2 w-full">
                    <TextInput value={city} setValue={setCity} error={cityError} setError={setCityError} label="Grad" />
                    <TextInput value={street} setValue={setStreet} error={streetError} setError={setStreetError} label="Ulica" />
                </div>
                <SelectInput value={category} setValue={setCategory} options={categoryOptions} label="Kategorija (opciono)" />

                <FormButton onClick={handleUpdate} disabled={loading || !changesMade}>
                    {loading ? <LoadingDots /> : "Sačuvaj izmene"}
                </FormButton>
                {creationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{creationError}</div> : ""}
                {message ? <div className="text-white font-semibold bg-green-500 p-2 rounded-lg">{message}</div> : ""}
                <div className="mt-8 flex justify-end">
                    <DeleteButton listing={listing} />
                </div>
            </div>
        </div>
    )
}

function DeleteButton({ listing }: { listing: Listing }) {
    const { push, refresh } = useRouter()
    async function handleDelete() {
        setLoading(true)

        const res = await fetch("/api/delete-listing", {
            method: "POST",
            body: JSON.stringify({ listingId: listing._id }),
        })

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            push("/nalog/objekti")
            refresh()
        } else {
            if (resBody.message) {
                throwError(setDeletionError, resBody.message)
            } else {
                throwError(setDeletionError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
        }
    }
    const [popupOn, setPopupOn] = useState(false)
    const [loading, setLoading] = useState(false)

    const [deletionError, setDeletionError] = useState("")

    return (
        <>
            <button onClick={() => setPopupOn(true)} className="bg-red-500 hover:bg-red-700 transition-colors text-white font-semibold h-10 flex justify-center items-center rounded-lg px-4">
                Obriši objekat
            </button>
            {popupOn ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20 px-sideSpace">
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setPopupOn(false)}></div>
                    <div className="w-full bg-white rounded-lg p-4 max-w-md z-10">
                        <p>Da li sigurno želiš da obrišeš ovaj objekat?</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setPopupOn(false)} className="bg-gray-300 hover:bg-gray-400 transition-colors font-semibold h-10 w-32 flex justify-center items-center rounded-lg px-4">
                                Ne
                            </button>
                            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 transition-colors text-white font-semibold h-10 w-32 flex justify-center items-center rounded-lg px-4">
                                {loading ? <LoadingDots /> : "Obriši"}
                            </button>
                        </div>
                        {deletionError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{deletionError}</div> : ""}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    )
}
