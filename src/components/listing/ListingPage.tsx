"use client"
import { Listing } from "@/types"
import ListingSwiper from "./ListingSwiper"
import { list } from "firebase/storage"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function page({ listing }: { listing: Listing }) {
    const session = useSession()
    const loggedIn = session.data
    return (
        <div className="px-sideSpace py-4 sm:py-16">
            <div className="flex gap-4 sm:gap-8 flex-col lg:flex-row items-center lg:items-stretch">
                <div className="max-w-xl w-full">
                    <ListingSwiper images={listing.images} />
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
                    <div>
                        <Description description={listing.description} />
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
                    <Link href={!loggedIn ? `/login?reservationRedirect=${listing._id}` : `/rezervisi/${listing._id}`} className="w-fit bg-primary block text-white font-semibold rounded-lg px-4 py-2 mt-6 transition-colors hover:bg-primaryDarker">
                        Rezerviši termin
                    </Link>
                </div>
            </div>
        </div>
    )
}

function Description({ description }: { description: string }) {
    const limitDescription = (description: string, limit: number) => {
        if (description.length > limit) {
            return description.substring(0, limit) + "..."
        }
        return description
    }
    return <p className={`block text-sm max-w-2xl ${!limitDescription(description, 250).includes(" ") ? "break-all" : ""}`}>{description}</p>
}
