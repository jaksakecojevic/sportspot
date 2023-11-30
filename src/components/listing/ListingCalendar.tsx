"use client"
import { Listing, Reservation, ReservationStatus } from "@/types"
import { Calendar, CalendarProps } from "antd"
import type { Moment } from "moment"
import momentGenerateConfig from "rc-picker/es/generate/moment"

const MyCalendar = Calendar.generateCalendar<Moment>(momentGenerateConfig)

function sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export default function ListingCalendar({ listing, reservations }: { listing: Listing; reservations: Reservation[] }) {
    function cellRender(date: Moment, info: any) {
        const matchingReservations = reservations.filter((n) => {
            return sameDay(new Date(n.startDate), date.toDate())
        })
        if (matchingReservations.length) {
            return (
                <>
                    {matchingReservations.map((reservation, index) => {
                        return (
                            <div className="flex gap-2 items-center" key={index}>
                                <StatusDot status={reservation.status} />
                                <p>
                                    {reservation.clientInfo.firstName} {reservation.clientInfo.lastName}
                                </p>
                            </div>
                        )
                    })}
                </>
            )
        }
        return ""
    }
    return <MyCalendar cellRender={cellRender} />
}

function StatusDot({ status }: { status: ReservationStatus }) {
    if (status == "open") return <div className="bg-blue-500 rounded-full w-2 h-2"></div>
    if (status == "finished") return <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
    if (status == "cancelled") return <div className="bg-red-500 rounded-full w-2 h-2"></div>
}
