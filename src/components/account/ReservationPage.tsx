"use client"
import { Reservation, ReservationStatus } from "@/types"
import moment from "moment"
import ReservationStatusBox from "./ReservationStatusBox"
import LoadingDots from "../LoadingDots"
import { Dispatch, SetStateAction, useState } from "react"
import throwError from "@/tools/throwError"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function ReservationPage({ reservation }: { reservation: Reservation }) {
    const reservationStartDate = moment(reservation.startDate)
    const reservationEndDate = moment(reservation.endDate)

    const [status, setStatus] = useState(reservation.status)

    return (
        <div className="flex flex-col justify-between h-full px-sideSpace py-4">
            <Link href={"/nalog/rezervacije"} className="px-4 py-2 rounded-lg hover:bg-gray-200 bg-white transition-colors flex gap-2 items-center w-fit">
                <FontAwesomeIcon icon={faArrowLeft} />
                Nazad
            </Link>
            <div>
                <div>ID rezervacije: {reservation._id}</div>
                <div className="flex gap-2 items-center">
                    Status: <ReservationStatusBox status={status} />
                </div>
                <div>Ime: {reservation.clientInfo.firstName}</div>
                <div>Prezime: {reservation.clientInfo.lastName}</div>
                <div>Broj telefona: {reservation.clientInfo.phoneNumber || "nema"}</div>
                <div>Email: {reservation.clientInfo.email}</div>
                <div>Datum: {reservationStartDate.format("DD.MM.YYYY.")}</div>
                <div>Vreme početka: {reservationStartDate.format("HH:mm")}</div>
                <div>Vreme kraja: {reservationEndDate.format("HH:mm")}</div>
            </div>
            <CancelButton reservation={reservation} status={status} setStatus={setStatus} />
        </div>
    )
}

function CancelButton({ reservation, status, setStatus }: { reservation: Reservation; status: ReservationStatus; setStatus: Dispatch<SetStateAction<ReservationStatus>> }) {
    const { refresh } = useRouter()
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
            refresh()
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
