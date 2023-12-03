"use client"
import ReservationStatusBox from "./ReservationStatusBox"
import { Listing, Reservation } from "@/types"
import moment from "moment"
import { useRouter } from "next/navigation"
import { MouseEventHandler, useState } from "react"

export default function ReservationRow({ reservation, listing }: { reservation: Reservation; listing: Listing }) {
    const router = useRouter()

    const reservationStartDate = moment(reservation.startDate)
    const reservationEndDate = moment(reservation.endDate)

    const handleClick: MouseEventHandler<HTMLTableRowElement> = (e) => {
        const url = `/nalog/rezervacije/${reservation._id}`
        if (e.button == 1) return window.open(url, "_blank")
        router.push(url)
    }

    return (
        <tr onMouseDown={handleClick} className="cursor-pointer bg-white hover:bg-gray-200 transition-colors">
            <td className=" py-2">{listing.title}</td>
            <td>{reservationStartDate.format("DD.MM.YYYY.")}</td>
            <td>{reservationStartDate.format("HH:mm")}</td>
            <td>{reservationEndDate.format("HH:mm")}</td>
            <td>
                <ReservationStatusBox status={reservation.status} />
            </td>
        </tr>
    )
}
