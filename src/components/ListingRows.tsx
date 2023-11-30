"use client"
import { Listing } from "@/types"
import ListingRow from "./ListingRow"
import SearchBar from "./SearchBar"
import { useState } from "react"

export default function ListingRows(props: { listings: Listing[] }) {
    const [listings, setListings] = useState<Listing[]>(props.listings)
    return (
        <>
            <SearchBar setListings={setListings} listings={listings} />
            <div className="flex flex-col gap-4 mt-4">
                {listings.map((listing, index) => {
                    return <ListingRow listing={listing} key={index} />
                })}
            </div>
        </>
    )
}
