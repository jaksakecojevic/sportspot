import { Category } from "@/types"
import { Dispatch, SetStateAction } from "react"

export type Option = {
    value: string
    label: string
}
export default function SelectInput({ value, setValue, options, label }: { value: string; setValue: Dispatch<SetStateAction<Category>>; options: Option[]; label?: string }) {
    return (
        <label className="w-full">
            {label}
            <select
                value={value}
                onChange={(e) => {
                    setValue(e.target.value as Category)
                }}
                className="px-3 py-1 w-full block rounded-md cursor-pointer outline-none border-2 focus:border-primary transition-border"
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}
