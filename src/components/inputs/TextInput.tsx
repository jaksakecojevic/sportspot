import { faEye } from "@fortawesome/free-regular-svg-icons"
import { faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, KeyboardEventHandler, SetStateAction, useState } from "react"

export default function TextInput({ value, setValue, label, error, setError, type, id, onKeyUp }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string; error?: string; setError?: Dispatch<SetStateAction<string>>; type?: "password"; id?: string; onKeyUp?: KeyboardEventHandler }) {
    const [focused, setFocused] = useState(false)
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    const [passwordHidden, setPasswordHidden] = useState(true)

    return (
        <label className="w-full">
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
                    onKeyUp={onKeyUp}
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
