"use client"
import { Listing, Reservation } from "@/types"
import ListingCalendar from "./ListingCalendar"
import Link from "next/link"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment, { Moment } from "moment"
import { useState } from "react"
import { sameDay } from "@/tools"
import ReservationStatusBox from "./ReservationStatusBox"
import LoadingDots from "../LoadingDots"

export default function ManageListingPage({ listing, reservations }: { listing: Listing; reservations: Reservation[] }) {
    const [date, setDate] = useState(moment())
    return (
        <div className="px-sideSpace py-4">
            <div className="flex justify-between gap-2 flex-wrap mb-4">
                <h1 className="text-2xl font-bold">Kalendar za {listing.title}</h1>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row">
                <div className="basis-3/4 order-1">
                    <ListingCalendar listing={listing} reservations={reservations} date={date} setDate={setDate} />
                </div>
                <div className="basis-1/4 lg:order-2 h-full w-full">
                    <SelectedDatePreview date={date} listing={listing} reservations={reservations} />
                </div>
            </div>
        </div>
    )
}
function SelectedDatePreview({ date, listing, reservations }: { date: Moment; listing: Listing; reservations: Reservation[] }) {
    const thisDateReservations = reservations.filter((n) => {
        const startDate = moment(n.startDate)
        return sameDay(date, startDate)
    })
    return (
        <div className="p-4 rounded-lg border-2 border-gray-200 h-full">
            <div>
                Datum: <span className="font-medium">{moment(date).format("DD.MM.YYYY.")}.</span>
            </div>
            <div className="mt-4">
                <h2 className="font-semibold text-lg">{thisDateReservations.length == 0 ? "Nema termina za ovaj datum" : "Termini"}</h2>
                <div className="flex flex-col gap-4 mt-4">
                    {thisDateReservations.map((reservation, index) => {
                        return <ReservationWidget reservation={reservation} listing={listing} key={index} />
                    })}
                </div>
            </div>
        </div>
    )
}
function ReservationWidget({ reservation, listing }: { reservation: Reservation; listing: Listing }) {
    const [loading, setLoading] = useState(false)
    return (
        <div className="p-2 rounded-lg border-gray-200 border-2">
            <div>
                <div className="flex justify-between items-center gap-4">
                    <div>
                        {reservation.clientInfo.firstName} {reservation.clientInfo.lastName}
                    </div>
                    <ReservationStatusBox status={reservation.status} />
                </div>
                <div>{moment(reservation.startDate).format("DD.MM.YYYY.")}</div>
                <div>
                    {moment(reservation.startDate).format("HH:mm")} - {moment(reservation.endDate).format("HH:mm")}
                </div>
                <div>{reservation.clientInfo.phoneNumber}</div>
                <div>{reservation.clientInfo.email}</div>
            </div>

            <Link onClick={() => setLoading(true)} href={`/nalog/objekti/${listing._id}/rezervacije/${reservation._id}`} className="bg-primary mt-2 w-full text-center sm:w-28 h-10 flex items-center justify-center hover:bg-primaryDarker transition-colors rounded-lg  text-white font-bold">
                {loading ? <LoadingDots /> : "Detaljnije"}
            </Link>
        </div>
    )
}
