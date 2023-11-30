import listingModel from "@/models/listing"

import { Reservation } from "@/types"
import moment from "moment"
import Link from "next/link"
import ReservationStatusBox from "./ReservationStatusBox"

export default async function ReservationWidget({ reservation }: { reservation: Reservation }) {
    const listing = await listingModel.findById(reservation.listingId)

    const reservationStartDate = new Date(reservation.startDate)
    const reservationEndDate = new Date(reservation.endDate)

    const startTimeString = moment(reservationStartDate).format("HH:mm")
    const endTimeString = moment(reservationEndDate).format("HH:mm")
    return (
        <Link href={`/nalog/rezervacije/${reservation._id}`} className="block p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-200 transition-colors">
            <img src={listing.images[0].url} className="w-full aspect-square object-cover rounded-lg" alt="" />
            <p className="font-semibold ">{listing.title}</p>
            <p className="">
                {reservationStartDate.getDate()}.{reservationStartDate.getMonth() + 1}.{reservationStartDate.getFullYear()}.
            </p>
            <p>
                {startTimeString} - {endTimeString}
            </p>
            <ReservationStatusBox status={reservation.status} />
        </Link>
    )
}
