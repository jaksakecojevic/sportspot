import { Listing, Reservation, User } from "@/types"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import Link from "next/link"
import ReservationStatusBox from "./ReservationStatusBox"
import { getFlagEmoji } from "@/tools"

export default function ManageReservationPage({ reservation, user, listing }: { reservation: Reservation; user: User; listing: Listing }) {
    const startDate = moment(reservation.startDate)
    const renderCountryInfo = () => {
        if (user.countryCode)
            return (
                <>
                    {getFlagEmoji(user.countryCode)}({user.countryCode})
                </>
            )
        else return ""
    }
    return (
        <div className="px-sideSpace py-4">
            <Link href={`/nalog/objekti/${listing._id}`} className="px-4 py-2 rounded-lg hover:bg-gray-200 bg-white transition-colors flex gap-2 items-center w-fit">
                <FontAwesomeIcon icon={faArrowLeft} />
                Nazad
            </Link>
            <h1 className="font-semibold text-2xl">Termin {startDate.format("DD.MM.YYYY.")}</h1>
            <div>
                Kupac termina: {reservation.clientInfo.firstName} {reservation.clientInfo.lastName} {renderCountryInfo()}
            </div>
            <div>
                {moment(reservation.startDate).format("HH:mm")} - {moment(reservation.endDate).format("HH:mm")}
            </div>
            <div>{reservation.clientInfo.phoneNumber}</div>
            <div>{reservation.clientInfo.email}</div>
            <div>Rezervacija kreirana: {moment(reservation.createdAt).format("DD.MM.YYYY. HH:mm")}</div>
            <div className="flex gap-2">
                Status: <ReservationStatusBox status={reservation.status} />
            </div>
        </div>
    )
}
