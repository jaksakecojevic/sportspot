"use client"
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "./LoadingDots"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import TextInput from "./TextInput"
import ImagesInput from "./ImagesInput"

export default function AddListingForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState<string[]>([])
    const [priceAmount, setPriceAmount] = useState(0)
    const [currency, setCurrency] = useState("RSD")

    const [free, setFree] = useState(false)

    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")

    const [category, setCategory] = useState("")

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
            alert("success")
        } else {
            if (resBody.message) {
                throwError(setCreationError, resBody.message)
            } else {
                throwError(setCityError, "Došlo je do greške. Pokušajte ponovo kasnije.")
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
                    <TextInput value={category} setValue={setCategory} label="Kategorija (opciono)" />

                    <button onClick={handleCreate} disabled={loading} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default active:brightness-90">
                        {loading ? <LoadingDots /> : "Objavi objekat"}
                    </button>
                    {creationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{creationError}</div> : ""}
                </div>
            </div>
        </div>
    )
}

function PriceInput({ amount, setAmount, currency, setCurrency, amountError, setAmmountError, free, setFree, label }: { amount: number; setAmount: Dispatch<SetStateAction<number>>; currency: string; setCurrency: Dispatch<SetStateAction<string>>; amountError: string; setAmmountError: Dispatch<SetStateAction<string>>; free?: boolean; setFree?: Dispatch<SetStateAction<boolean>>; label: string }) {
    const [focused, setFocused] = useState(false)
    const errorHtml = amountError ? <p className="font-bold text-red-500">{amountError}</p> : ""
    const [passwordHidden, setPasswordHidden] = useState(true)
    return (
        <label>
            {errorHtml || label}
            <div className="relative flex gap-2">
                <input
                    type={"number"}
                    value={amount}
                    onFocus={() => {
                        if (setAmmountError) setAmmountError("")
                        setFocused(true)
                    }}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className={`px-3 py-1 w-full block rounded-md outline-none border-2 ${amountError ? "border-red-500" : "border-gray-200"} focus:border-primary transition-border`}
                />
                <select
                    value={currency}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setCurrency(e.target.value)
                    }}
                    className="px-3 py-1 rounded-md outline-none border-2 border-gray-200 cursor-pointer hover:bg-gray-200"
                >
                    <option value="RSD">RSD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </label>
    )
}

function DescriptionInput({ value, setValue, label, error, setError, id }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string; error?: string; setError?: Dispatch<SetStateAction<string>>; id?: string }) {
    const [focused, setFocused] = useState(false)
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""

    return (
        <label>
            {errorHtml || label}
            <div className="relative">
                <textarea
                    value={value}
                    id={id ? id : undefined}
                    onFocus={() => {
                        if (setError) setError("")
                        setFocused(true)
                    }}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    className={`px-3 py-1 w-full block rounded-md outline-none border-2 resize-none min-h-[150px] ${error ? "border-red-500" : "border-gray-200"} focus:border-primary transition-border`}
                />
            </div>
        </label>
    )
}
