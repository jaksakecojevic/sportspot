import { Listing, Reservation } from "@/types"
import ListingCalendar from "./ListingCalendar"
import Link from "next/link"
import { faAdd, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ManageListingPage({ listing, reservations }: { listing: Listing; reservations: Reservation[] }) {
    return (
        <div>
            <div className="flex justify-between gap-2 flex-wrap mb-4">
                <h1 className="text-2xl font-bold">Kalendar za {listing.title}</h1>

                <Link href={`/nalog/objekti/${listing._id}/edit`} className="bg-green-600 w-fit text-white px-2 py-1 rounded-lg flex items-center gap-2 font-bold hover:bg-green-800 transition-colors">
                    <FontAwesomeIcon icon={faPencil} className="block" />
                    Izmenjivanje objekta
                </Link>
            </div>
            <ListingCalendar listing={listing} reservations={reservations} />
        </div>
    )
}
