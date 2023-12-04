"use client"
import { Listing } from "@/types"
import ListingSwiper from "./ListingSwiper"
import { list } from "firebase/storage"
import Link from "next/link"
import { useSession } from "next-auth/react"
import ListingDescription from "./ListingDescription"
import { useState } from "react"
import LoadingDots from "../LoadingDots"

export default function page({ listing }: { listing: Listing }) {
    const session = useSession()
    const loggedIn = session.data
    const [loading, setLoading] = useState(false)
    return (
        <div className="px-sideSpace py-8 sm:py-16 min-h-screen">
            <div className="flex gap-4 sm:gap-8 flex-col lg:flex-row items-center lg:items-stretch">
                <div className="max-w-xl w-full">
                    <ListingSwiper images={listing.images} />
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
                    <div>
                        <ListingDescription description={listing.description} />
                    </div>
                    <div className="my-4 font-semibold text-lg">
                        Lokacija: {listing.address.city}, {listing.address.street}
                    </div>

                    <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">
                        Cena za 1h
                        <div className="text-lg font-semibold">
                            {listing.pricePerHour.amount} {listing.pricePerHour.currency}
                        </div>
                    </div>
                    <Link onClick={() => setLoading(true)} href={!loggedIn ? `/login?reservationRedirect=${listing._id}` : `/rezervisi/${listing._id}`} className="w-full sm:w-40 bg-primary flex items-center justify-center text-center text-white font-semibold rounded-lg h-10 mt-6 transition-colors hover:bg-primaryDarker">
                        {loading ? <LoadingDots /> : "Rezerviši termin"}
                    </Link>
                </div>
            </div>
        </div>
    )
}
