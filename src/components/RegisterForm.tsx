"use client"
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "./LoadingDots"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import TextInput from "./inputs/TextInput"

export default function RegisterForm() {
    const params = useSearchParams()
    const redirectId = params.get("reservationRedirect")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [registrationError, setRegistrationError] = useState("")

    const [loading, setLoading] = useState(false)

    function throwError(setError: Dispatch<SetStateAction<string>>, message: string, time = 2500) {
        setError(message)
        setTimeout(() => {
            setError("")
        }, time)
    }

    function isInvalid() {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let hasErrors = false
        if (!firstName) {
            throwError(setFirstNameError, "Ime je obavezno polje.")
            hasErrors = true
        }
        if (!lastName) {
            throwError(setLastNameError, "Prezime je obavezno polje.")
            hasErrors = true
        }
        if (!email.match(emailRegex)) {
            throwError(setEmailError, "Email nije ispravan.")
            hasErrors = true
        }
        if (!email) {
            throwError(setEmailError, "Email je obavezno polje.")
            hasErrors = true
        }
        if (password.length < 6) {
            throwError(setPasswordError, "Šifra mora sadržati najmanje 6 karaktera.")
            hasErrors = true
        }
        if (!password) {
            throwError(setPasswordError, "Šifra je obavezno polje.")
            hasErrors = true
        }

        return hasErrors
    }

    async function handleRegister() {
        if (isInvalid()) return

        setLoading(true)

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        })

        const resBody = await res.json()

        if (resBody.success) {
            await signIn("credentials", {
                email,
                password,
                callbackUrl: redirectId ? `/rezervisi/${redirectId}` : "/nalog",
            })
        } else {
            if (resBody.message) {
                throwError(setRegistrationError, resBody.message)
            } else {
                throwError(setRegistrationError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex justify-center items-center px-sideSpace">
            <div className="w-full max-w-lg">
                <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col gap-4">
                    <h1 className="text-center text-2xl font-bold">Registracija</h1>
                    <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
                        <TextInput id="name" value={firstName} setValue={setFirstName} error={firstNameError} setError={setFirstNameError} label="Ime" />
                        <TextInput id="lastname" value={lastName} setValue={setLastName} error={lastNameError} setError={setLastNameError} label="Prezime" />
                    </div>
                    <TextInput id="email" value={email} setValue={setEmail} error={emailError} setError={setEmailError} label="Email" />
                    <TextInput id="password" value={password} setValue={setPassword} error={passwordError} setError={setPasswordError} label="Lozinka" type="password" />
                    <button onClick={handleRegister} disabled={loading} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default active:brightness-90">
                        {loading ? <LoadingDots /> : "Registruj se"}
                    </button>
                    {registrationError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{registrationError}</div> : ""}
                </div>
                <Link href={redirectId ? `/login?reservationRedirect=${redirectId}` : `/login`} className="text-center block w-full mt-4 text-primary hover:text-primaryDarker transition-colors">
                    Već imaš nalog? Uloguj se
                </Link>
            </div>
        </div>
    )
}
