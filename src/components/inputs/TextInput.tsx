import { faEye } from "@fortawesome/free-regular-svg-icons"
import { faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, FocusEventHandler, KeyboardEventHandler, SetStateAction, useEffect, useRef, useState } from "react"
type TextInputProps = {
    value: string
    setValue: Dispatch<SetStateAction<string>>
    label?: string
    error?: string
    setError?: Dispatch<SetStateAction<string>>
    type?: "password"
    id?: string
    onKeyUp?: KeyboardEventHandler
    onKeyDown?: KeyboardEventHandler
    onFocus?: FocusEventHandler<HTMLInputElement>
    focused?: boolean
    setFocused?: Dispatch<SetStateAction<boolean>>
}
export default function TextInput({ value, setValue, label, error, setError, type, id, onKeyUp, onKeyDown, onFocus, focused, setFocused }: TextInputProps) {
    const errorHtml = error ? <p className="font-bold text-red-500">{error}</p> : ""
    const [passwordHidden, setPasswordHidden] = useState(true)

    useEffect(() => {
        if (focused && ref.current) ref.current.focus()
    }, [focused])

    const ref = useRef<HTMLInputElement>(null)

    return (
        <label className="w-full">
            {errorHtml || label}
            <div className="relative">
                <input
                    ref={ref}
                    type={type == "password" ? (passwordHidden ? "password" : "text") : "text"}
                    value={value}
                    id={id ? id : undefined}
                    onFocus={(e) => {
                        if (setError) setError("")
                        if (onFocus) onFocus(e)
                        if (setFocused) setFocused(true)
                    }}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onBlur={() => {
                        if (setFocused) setFocused(false)
                    }}
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
