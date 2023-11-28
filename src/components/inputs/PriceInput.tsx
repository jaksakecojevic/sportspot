import { Dispatch, SetStateAction, useState } from "react"

export default function PriceInput({ amount, setAmount, currency, setCurrency, amountError, setAmmountError, free, setFree, label }: { amount: number; setAmount: Dispatch<SetStateAction<number>>; currency: string; setCurrency: Dispatch<SetStateAction<string>>; amountError: string; setAmmountError: Dispatch<SetStateAction<string>>; free?: boolean; setFree?: Dispatch<SetStateAction<boolean>>; label: string }) {
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
