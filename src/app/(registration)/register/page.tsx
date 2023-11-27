"use client"
import { Dispatch, SetStateAction, useState } from "react"

export default function Login() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="w-full flex justify-center items-center px-sideSpace">
            <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col gap-4">
                <h1 className="text-center text-2xl font-bold">Registracija</h1>
                <div className="flex gap-4">
                    <TextInput value={firstName} setValue={setFirstName} label="Ime" />
                    <TextInput value={lastName} setValue={setLastName} label="Prezime" />
                </div>
                <TextInput value={email} setValue={setEmail} label="Email" />
                <TextInput value={password} setValue={setPassword} label="Lozinka" />
                <button className="bg-primary p-2 w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors">Registruj se</button>
            </div>
        </div>
    )
}

function TextInput({ value, setValue, label }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string }) {
    const [focused, setFocused] = useState(false)
    const input = <input type="text" value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(e) => setValue(e.target.value)} className="px-3 py-1 w-full block rounded-md outline-none border-2 border-gray-200 focus:border-primary transition-border" />
    if (label)
        return (
            <label>
                {label}
                {input}
            </label>
        )
    return input
}
