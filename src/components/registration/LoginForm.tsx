"use client"
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useState } from "react"
import LoadingDots from "../LoadingDots"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import TextInput from "../inputs/TextInput"
import GoogleButton from "./GoogleButton"

export default function LoginForm() {
    const { push, refresh } = useRouter()
    const params = useSearchParams()
    const redirectId = params.get("reservationRedirect")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [passwordFocused, setPasswordFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)

    const [loginError, setLoginError] = useState("")

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

    async function handleLogin() {
        if (isInvalid()) return

        setLoading(true)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            throwError(setLoginError, res.error)
            setLoading(false)
        } else {
            push(redirectId ? `/rezervisi/${redirectId}` : "/nalog")
            refresh()
        }
    }

    return (
        <div className="w-full flex justify-center items-center px-sideSpace">
            <div className="w-full max-w-lg">
                <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col gap-4">
                    <h1 className="text-center text-2xl font-bold">Prijava</h1>
                    <TextInput
                        id="email"
                        value={email}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                if (password) handleLogin()
                                else setPasswordFocused(true)
                            }
                        }}
                        focused={emailFocused}
                        setFocused={setEmailFocused}
                        setValue={setEmail}
                        error={emailError}
                        setError={setEmailError}
                        label="Email"
                    />
                    <TextInput
                        id="password"
                        value={password}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                if (email) handleLogin()
                                else setEmailFocused(true)
                            }
                        }}
                        focused={passwordFocused}
                        setFocused={setPasswordFocused}
                        setValue={setPassword}
                        error={passwordError}
                        setError={setPasswordError}
                        label="Lozinka"
                        type="password"
                    />
                    <button onClick={handleLogin} disabled={loading} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default active:brightness-90">
                        {loading ? <LoadingDots /> : "Prijavi se"}
                    </button>
                    {loginError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg">{loginError}</div> : ""}
                </div>
                <GoogleButton />
                <Link href={redirectId ? `/register?reservationRedirect=${redirectId}` : `/register`} className="text-center block w-full mt-4 text-primary hover:text-primaryDarker transition-colors">
                    Nemaš nalog? Registruj se
                </Link>
            </div>
        </div>
    )
}
