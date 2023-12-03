import { Reservation } from "@/types"

import ReservationRow from "./ReservationRow"
import listingModel from "@/models/listing"
import serializeData from "@/tools/serializeData"

export default async function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
    const rows = await Promise.all(
        reservations.map(async (reservation, index) => {
            const listing = await listingModel.findById(reservation.listingId)
            return <ReservationRow key={index} reservation={reservation} listing={serializeData(listing)} />
        })
    )
    return (
        <div className="overflow-x-auto">
            <table className="w-full ">
                <thead className="text-left">
                    <tr>
                        <th>Ime objekta</th>
                        <th>Datum termina</th>
                        <th>Vreme kraja</th>
                        <th>Vreme početka</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">{rows}</tbody>
            </table>
        </div>
    )
}
