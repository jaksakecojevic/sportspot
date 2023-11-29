"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import LoadingDots from "./LoadingDots"
import TextInput from "./inputs/TextInput"
import { Listing, User } from "@/types"

import DateInput from "./inputs/DateInput"
import TimeInput from "./inputs/TimeInput"
import { Moment } from "moment"
import FormButton from "./inputs/FormButton"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function ReserveListingForm({ listing, user }: { listing: Listing; user: User }) {
    const { push } = useRouter()
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState(user.email)

    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")
    const [emailError, setEmailError] = useState("")

    const [day, setDay] = useState<Date>()
    const [dayError, setDayError] = useState("")

    const [startTime, setStartTime] = useState<string | undefined>("")
    const [endTime, setEndTime] = useState<string | undefined>("")

    const [startTimeError, setStartTimeError] = useState("")
    const [endTimeError, setEndTimeError] = useState("")

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
        if (!email) {
            throwError(setEmailError, "Email je obavezno polje.")
            hasErrors = true
        }
        if (!day) {
            throwError(setDayError, "Datum je obavezno polje.")
            hasErrors = true
        }
        if (!startTime) {
            throwError(setStartTimeError, "Vreme početka je obavezno polje.")
            hasErrors = true
        }

        if (!endTime) {
            throwError(setEndTimeError, "Vreme kraja je obavezno polje.")
            hasErrors = true
        }

        return hasErrors
    }

    async function handleCreate() {
        if (isInvalid()) return

        setLoading(true)

        const res = await fetch("/api/create-reservation", {
            method: "POST",
            body: JSON.stringify({ listingId: listing._id, firstName, lastName, phoneNumber, email, day, startTime, endTime }),
        })
        if (!res.ok) {
            setLoading(false)
            return throwError(setCreationError, "Došlo je do greške. Pokušajte ponovo kasnije.")
        }

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            if (resBody.reservationId) return push(`/nalog/rezervacije/${resBody.reservationId}`)
            push("/")
        } else {
            if (resBody.message) {
                throwError(setCreationError, resBody.message)
            } else {
                throwError(setCreationError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
        }
    }

    const disabledTime = (date: Moment) => {
        if (!startTime) return
        const startHours = startTime.split(":")[0]
        const pastHours = Array.from({ length: parseInt(startHours) + 1 }, (e, i) => i)

        const minuteOptions = [0, 15, 30, 45, 60]
        const startMinutes = parseInt(startTime.split(":")[1])
        return {
            disabledHours: () => pastHours,
            disabledMinutes: () => minuteOptions.filter((n) => n != startMinutes),
        }
    }

    useEffect(() => {
        setEndTime("")
    }, [startTime])

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
                    <TextInput value={phoneNumber} id="phone" setValue={setPhoneNumber} error={phoneNumberError} setError={setPhoneNumberError} label="Broj telefona" />
                    <TextInput value={email} id="email" setValue={setEmail} error={emailError} setError={setEmailError} label="Email" />

                    <DateInput date={day} setDate={setDay} error={dayError} setError={setDayError} label="Izaberi dan" />

                    <div className="flex gap-2 w-full">
                        <TimeInput date={startTime} setDate={setStartTime} error={startTimeError} setError={setStartTimeError} label="Vreme početka" />
                        <TimeInput date={endTime} disabledTime={disabledTime} disabled={!startTime} title={!startTime ? "Prvo unesi vreme početka" : ""} setDate={setEndTime} error={endTimeError} setError={setEndTimeError} label="Vreme kraja" />
                    </div>
                    <Total listing={listing} startTime={startTime} endTime={endTime} />
                    <FormButton onClick={handleCreate} disabled={loading}>
                        {loading ? <LoadingDots /> : "Rezerviši"}
                    </FormButton>
                    {creationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{creationError}</div> : ""}
                </div>
            </div>
        </div>
    )
}

function Total({ listing, startTime, endTime }: { listing: Listing; startTime: string | undefined; endTime: string | undefined }) {
    const [total, setTotal] = useState("")

    const duration = endTime && startTime ? parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0]) : 1

    return (
        <>
            <div className="flex gap-2">
                <p className="font-semibold">Cena:</p>{" "}
                <p>
                    {duration * listing.pricePerHour.amount} {listing.pricePerHour.currency} ({duration}h)
                </p>
            </div>
            <p>Plaćenje prilikom dolaska.</p>
        </>
    )
}
