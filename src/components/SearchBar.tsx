"use client"
import getListings from "@/api_actions/getListings"
import { Category, Listing } from "@/types"
import { faArrowDown, faArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react"

export default function SearchBar({ setListings }: { setListings: Dispatch<SetStateAction<Listing[]>> }) {
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState<Category>("all")
    const [sort, setSort] = useState<"expensive" | "cheap">("cheap")

    const [lastSearchedQuery, setLastSearchedQuery] = useState("")

    async function handleSearch() {
        const newListings = await getListings({
            query,
            category,
            sort,
        })
        setListings(newListings)
        setLastSearchedQuery(query)
    }

    useDidUpdateEffect(() => {
        handleSearch()
    }, [category, sort])

    return (
        <div className="px-3 py-2 bg-primary flex items-stretch flex-wrap gap-3 w-full rounded-lg">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                    onKeyUp={(e) => {
                        if (e.key == "Enter" && query && query != lastSearchedQuery) handleSearch()
                    }}
                    className="px-4 py-1 rounded-l-lg outline-none w-full max-w-xs"
                    placeholder="Pretraži..."
                />
                <button
                    className="bg-secondary rounded-r-lg px-3 hover:bg-secondaryDarker transition-colors"
                    onClick={() => {
                        if (query != lastSearchedQuery) handleSearch()
                    }}
                    title="Pretraga"
                >
                    <FontAwesomeIcon icon={faSearch} className="text-white" />
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-white">Kategorija</p>
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value as Category)
                    }}
                    className="px-3 rounded-lg outline-none cursor-pointer h-full"
                >
                    <option value="all">Svi</option>
                    <option value="football">Fudbal</option>
                    <option value="basketball">Košarka</option>
                    <option value="tennis">Tenis</option>
                    <option value="pool">Bazen</option>
                </select>
            </div>
            <div className=" flex items-center gap-2">
                <p className="text-white">Sortiraj po ceni</p>
                <button
                    className="bg-white px-3 rounded-lg h-full hover:bg-gray-300 transition-colors"
                    onClick={() => {
                        setSort((current) => {
                            if (current == "expensive") return "cheap"
                            if (current == "cheap") return "expensive"
                            return "cheap"
                        })
                    }}
                >
                    {sort == "expensive" ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                </button>
            </div>
        </div>
    )
}
function useDidUpdateEffect(fn: any, inputs: any) {
    const isMountingRef = useRef(false)

    useEffect(() => {
        isMountingRef.current = true
    }, [])

    useEffect(() => {
        if (!isMountingRef.current) {
            return fn()
        } else {
            isMountingRef.current = false
        }
    }, inputs)
}
