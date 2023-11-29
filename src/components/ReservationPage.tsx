"use client"

import { Reservation } from "@/types"

export default function ReservationPage({ reservation }: { reservation: Reservation }) {
    const reservationStartDate = new Date(reservation.startDate)
    const reservationEndDate = new Date(reservation.endDate)

    const startHours = reservationStartDate.getHours()
    const startMinutes = reservationStartDate.getMinutes()

    const endHours = reservationEndDate.getHours()
    const endMinutes = reservationEndDate.getMinutes()
    return (
        <div>
            <div>ID rezervacije: {reservation._id}</div>
            <div>Ime: {reservation.clientInfo.firstName}</div>
            <div>Prezime: {reservation.clientInfo.lastName}</div>
            <div>Broj telefona: {reservation.clientInfo.phoneNumber || "nema"}</div>
            <div>Email: {reservation.clientInfo.email}</div>
            <div>
                Datum: {reservationStartDate.getDate()}.{reservationStartDate.getMonth() + 1}.{reservationStartDate.getFullYear()}.
            </div>
            <div>
                Vreme početka: {startHours}:{startMinutes}
            </div>
            <div>
                Vreme kraja: {endHours}:{endMinutes}
            </div>
        </div>
    )
}
