"use client"
import { getFlagEmoji } from "@/tools"
import { countries as allCountries } from "countries-list"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
export default function CountryInput({ value, setValue, label }: { value: string; setValue: Dispatch<SetStateAction<string>>; label?: string }) {
    const [dropdownOn, setDropdownOn] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    return (
        <label className="relative">
            {label || ""}
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {}}
                    onKeyDown={(e) => {
                        setSearchValue((current) => {
                            if (e.key == "Backspace") return current.slice(0, -1)
                            if (e.key.length == 1) return current + e.key
                            return current
                        })
                    }}
                    onFocus={() => {
                        setSearchValue("")
                        setDropdownOn(true)
                    }}
                    onBlur={() => {
                        setSearchValue("")
                        setDropdownOn(false)
                    }}
                    className={`px-3 py-1 w-full block rounded-md outline-none border-2 cursor-pointer focus:border-primary transition-border`}
                />
                <span className="absolute right-3 top-[6px]">{getFlagEmoji(value)}</span>
            </div>
            {dropdownOn ? <Dropdown setValue={setValue} searchValue={searchValue} setSearchValue={setSearchValue} /> : ""}
        </label>
    )
}

function Dropdown({ setValue, searchValue, setSearchValue }: { setValue: Dispatch<SetStateAction<string>>; searchValue: string; setSearchValue: Dispatch<SetStateAction<string>> }) {
    const [countries, setCountries] = useState({ ...allCountries })
    useEffect(() => {
        //@ts-ignore
        setCountries((current) => {
            const newCountries = {}
            Object.keys(allCountries).forEach((key) => {
                //@ts-ignore
                if (allCountries[key].name.toLowerCase().includes(searchValue.toLowerCase()) || key.toLowerCase().includes(searchValue.toLowerCase())) {
                    //@ts-ignore
                    newCountries[key] = allCountries[key]
                }
            })
            return newCountries
        })
    }, [searchValue])
    return (
        <div className="absolute top-full left-0 mt-2 z-10 bg-white p-2 rounded-lg max-h-72 overflow-y-auto shadow-xl">
            {Object.keys(countries).map((countryCode, index) => {
                return (
                    <div
                        onMouseDown={() => {
                            setSearchValue("")
                            setValue(countryCode)
                        }}
                        key={index}
                        className="p-1 bg-white hover:bg-gray-200 transition-colors rounded-lg cursor-pointer flex items-center justify-between"
                    >
                        {/* @ts-ignore */}
                        {allCountries[countryCode].name}
                        <span>{getFlagEmoji(countryCode)}</span>
                    </div>
                )
            })}
        </div>
    )
}
