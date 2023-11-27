"use client"
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "./LoadingDots"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterForm() {
    const { push } = useRouter()
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
            push("/")
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
            <div>
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
                <Link href={"/login"} className="text-center block w-full mt-4 text-primary hover:text-primaryDarker transition-colors">
                    Već imaš nalog? Uloguj se
                </Link>
            </div>
        </div>
    )
}

function TextInput({ value, setValue, label, error, setError, type, id }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string; error?: string; setError?: Dispatch<SetStateAction<string>>; type?: "password"; id?: string }) {
    const [focused, setFocused] = useState(false)
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    const [passwordHidden, setPasswordHidden] = useState(true)

    return (
        <label>
            {errorHtml || label}
            <div className="relative">
                <input
                    type={type == "password" ? (passwordHidden ? "password" : "text") : "text"}
                    value={value}
                    id={id ? id : undefined}
                    onFocus={() => {
                        if (setError) setError("")
                        setFocused(true)
                    }}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    className={`px-3 py-1 w-full block rounded-md outline-none border-2 ${error ? "border-red-500" : "border-gray-200"} focus:border-primary transition-border`}
                />
                {type == "password" ? (
                    <button className="absolute right-3 top-2" onClick={() => setPasswordHidden((current) => !current)}>
                        {passwordHidden ? <FontAwesomeIcon icon={faEyeLowVision} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                ) : (
                    ""
                )}
            </div>
        </label>
    )
}
