import listingModel from "@/models/listing"
import listing from "@/models/listing"
import { Reservation } from "@/types"
import Link from "next/link"

export default async function ReservationWidget({ reservation }: { reservation: Reservation }) {
    const listing = await listingModel.findById(reservation.listingId)

    const reservationStartDate = new Date(reservation.startDate)
    const reservationEndDate = new Date(reservation.endDate)

    const startHours = reservationStartDate.getHours()
    const startMinutes = reservationStartDate.getMinutes()

    const endHours = reservationEndDate.getHours()
    const endMinutes = reservationEndDate.getMinutes()
    return (
        <Link href={`/nalog/rezervacije/${reservation._id}`} className="block p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-200 transition-colors">
            <img src={listing.images[0]} className="w-full aspect-square object-cover rounded-lg" alt="" />
            <p className="font-semibold ">{listing.title}</p>
            <p className="">
                {reservationStartDate.getDate()}.{reservationStartDate.getMonth() + 1}.{reservationStartDate.getFullYear()}.
            </p>
            <p>
                {startHours}:{startMinutes} - {endHours}:{endMinutes}
            </p>
        </Link>
    )
}
