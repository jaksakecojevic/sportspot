"use client"

import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "./LoadingDots"
import TextInput from "./inputs/TextInput"
import ImagesInput from "./ImagesInput"
import { Category, Listing } from "@/types"

export default function ReserveListingForm({ listing }: { listing: Listing }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    const [endDate, setEndDate] = useState<Date>()
    const [startDate, setStartDate] = useState<Date>()

    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")

    const [endDateError, setEndDateError] = useState<Date>()
    const [startDateErrore, setStartDateError] = useState<Date>()

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
        if (!firstName) {
            throwError(setFirstNameError, "Ime je obavezno polje.")
            hasErrors = true
        }
        if (!lastName) {
            throwError(setLastNameError, "Prezime je obavezno polje.")
            hasErrors = true
        }
        if (!phoneNumber) {
            throwError(setPhoneNumberError, "Broj telefona je obavezno polje.")
            hasErrors = true
        }

        return hasErrors
    }

    async function handleCreate() {
        if (isInvalid()) return

        setLoading(true)

        const res = await fetch("/api/create-reservation", {
            method: "POST",
            body: JSON.stringify({ listingId: listing.id, firstName, lastName, phoneNumber, email, startDate, endDate }),
        })

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            alert("success")
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
                    <div className="flex justify-center w-full">
                        <img src={listing.images[0]} className="rounded-lg h-[200px] object-cover w-full" width={500} alt="" />
                    </div>
                    <h1 className="text-center text-2xl font-bold">Rezerviši termin, {listing.title}</h1>
                    <div className="flex gap-2 w-full">
                        <TextInput value={firstName} setValue={setFirstName} error={firstNameError} setError={setFirstNameError} label="Ime" />
                        <TextInput value={lastName} setValue={setLastName} error={lastNameError} setError={setLastNameError} label="Prezime" />
                    </div>
                    <TextInput value={phoneNumber} setValue={setPhoneNumber} error={phoneNumberError} setError={setPhoneNumberError} label="Broj telefona" />
                    <TextInput value={email} setValue={setEmail} label="Email (opciono)" />

                    <button onClick={handleCreate} disabled={loading} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default active:brightness-90">
                        {loading ? <LoadingDots /> : "Rezerviši"}
                    </button>
                    {creationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{creationError}</div> : ""}
                </div>
            </div>
        </div>
    )
}
