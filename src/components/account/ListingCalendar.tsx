"use client"
import { Listing, Reservation, ReservationStatus } from "@/types"
import { Calendar, CalendarProps } from "antd"
import type { Moment } from "moment"
import moment from "moment"
import momentGenerateConfig from "rc-picker/es/generate/moment"
import { Dispatch, SetStateAction, useState } from "react"

import srRS from "antd/es/calendar/locale/sr_RS"
import { sameDay } from "@/tools"

const MyCalendar = Calendar.generateCalendar<Moment>({ ...momentGenerateConfig })

export default function ListingCalendar({ listing, reservations, date, setDate }: { listing: Listing; reservations: Reservation[]; date: Moment; setDate: Dispatch<SetStateAction<Moment>> }) {
    function cellRender(date: Moment, info: any) {
        const matchingReservations = reservations.filter((n) => {
            return sameDay(moment(new Date(n.startDate)), date)
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
    function handleChange(d: Moment) {
        setDate(d)
        console.log(d)
    }

    return (
        <MyCalendar
            cellRender={cellRender}
            onSelect={handleChange}
            defaultValue={date}
            locale={{
                ...srRS,
                lang: {
                    ...srRS.lang,
                    shortWeekDays: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
                },
            }}
        />
    )
}

function StatusDot({ status }: { status: ReservationStatus }) {
    if (status == "open") return <div className="bg-blue-500 rounded-full w-2 h-2"></div>
    if (status == "finished") return <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
    if (status == "cancelled") return <div className="bg-red-500 rounded-full w-2 h-2"></div>
}
