import { Dispatch, SetStateAction, useState } from "react"

export default function DescriptionInput({ value, setValue, label, error, setError, id }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string; error?: string; setError?: Dispatch<SetStateAction<string>>; id?: string }) {
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
