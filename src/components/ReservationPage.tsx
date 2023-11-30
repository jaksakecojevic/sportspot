"use client"
import { Reservation, ReservationStatus } from "@/types"
import moment from "moment"
import ReservationStatusBox from "./ReservationStatusBox"
import LoadingDots from "./LoadingDots"
import { Dispatch, SetStateAction, useState } from "react"
import throwError from "@/tools/throwError"

export default function ReservationPage({ reservation }: { reservation: Reservation }) {
    const reservationStartDate = new Date(reservation.startDate)
    const reservationEndDate = new Date(reservation.endDate)

    const startTimeString = moment(reservationStartDate).format("HH:mm")
    const endTimeString = moment(reservationEndDate).format("HH:mm")

    const [status, setStatus] = useState(reservation.status)

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div>ID rezervacije: {reservation._id}</div>
                <div className="flex gap-2 items-center">
                    Status: <ReservationStatusBox status={status} />
                </div>
                <div>Ime: {reservation.clientInfo.firstName}</div>
                <div>Prezime: {reservation.clientInfo.lastName}</div>
                <div>Broj telefona: {reservation.clientInfo.phoneNumber || "nema"}</div>
                <div>Email: {reservation.clientInfo.email}</div>
                <div>
                    Datum: {reservationStartDate.getDate()}.{reservationStartDate.getMonth() + 1}.{reservationStartDate.getFullYear()}.
                </div>
                <div>Vreme početka: {startTimeString}</div>
                <div>Vreme kraja: {endTimeString}</div>
            </div>
            <CancelButton reservation={reservation} status={status} setStatus={setStatus} />
        </div>
    )
}

function CancelButton({ reservation, status, setStatus }: { reservation: Reservation; status: ReservationStatus; setStatus: Dispatch<SetStateAction<ReservationStatus>> }) {
    async function handleCancel() {
        setLoading(true)

        const res = await fetch("/api/cancel-reservation", {
            method: "POST",
            body: JSON.stringify({ reservationId: reservation._id }),
        })

        const resBody = await res.json()
        setLoading(false)
        if (resBody.success) {
            setStatus("cancelled")
            setPopupOn(false)
        } else {
            if (resBody.message) {
                throwError(setDeletionError, resBody.message)
            } else {
                throwError(setDeletionError, "Došlo je do greške. Pokušajte ponovo kasnije.")
            }
        }
    }
    const [popupOn, setPopupOn] = useState(false)
    const [loading, setLoading] = useState(false)

    const [deletionError, setDeletionError] = useState("")
    if (status == "cancelled") return ""
    return (
        <>
            <button onClick={() => setPopupOn(true)} className="bg-red-500 w-fit hover:bg-red-700 transition-colors text-sm text-white font-semibold py-1 flex justify-center items-center rounded-lg px-2">
                Otkaži rezervaciju
            </button>
            {popupOn ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20 px-sideSpace">
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setPopupOn(false)}></div>
                    <div className="w-full bg-white rounded-lg p-4 max-w-md z-10">
                        <p>Da li sigurno želiš da otkažeš rezervaciju?</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setPopupOn(false)} className="bg-gray-300 hover:bg-gray-400 transition-colors font-semibold h-10 w-32 flex justify-center items-center rounded-lg px-4">
                                Ne
                            </button>
                            <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 transition-colors text-white font-semibold h-10 w-52 flex justify-center items-center rounded-lg px-4">
                                {loading ? <LoadingDots /> : "Otkaži rezervaciju"}
                            </button>
                        </div>
                        {deletionError ? <div className="text-white font-semibold bg-red-500 p-2 rounded-lg mt-4">{deletionError}</div> : ""}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    )
}
