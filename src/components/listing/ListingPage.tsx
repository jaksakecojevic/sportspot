import { Listing } from "@/types"
import ListingSwiper from "./ListingSwiper"
import { list } from "firebase/storage"
import Link from "next/link"

export default function page({ listing }: { listing: Listing }) {
    return (
        <div className="px-sideSpace py-8">
            <div className="flex gap-4 flex-col lg:flex-row items-center lg:items-stretch">
                <div className="max-w-xl w-full">
                    <ListingSwiper images={listing.images} />
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold">{listing.title}</h1>
                    <div>
                        <p>{listing.description}</p>
                        <p>{listing.address.city}</p>
                        <p>{listing.address.street}</p>
                    </div>

                    <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">
                        Cena za 1h
                        <div className="text-lg font-semibold">
                            {listing.pricePerHour.amount} {listing.pricePerHour.currency}
                        </div>
                    </div>
                    <Link href={`/rezervisi/${listing._id}`} className="w-fit bg-primary block text-white font-semibold rounded-lg px-4 py-2 mt-6 transition-colors hover:bg-primaryDarker">
                        Rezervisi termin
                    </Link>
                </div>
            </div>
        </div>
    )
}
