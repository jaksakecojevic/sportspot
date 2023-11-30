import { ReservationStatus } from "@/types"

export default function ReservationStatusBox({ status }: { status: ReservationStatus }) {
    if (status == "open") return <div className="bg-blue-300 rounded-lg font-semibold text-blue-800 py-1 px-2 w-fit">Aktivna</div>
    if (status == "finished") return <div className="bg-yellow-300 rounded-lg font-semibold text-yellow-700  py-1 px-2 w-fit">Završena</div>
    if (status == "cancelled") return <div className="bg-red-400 rounded-lg font-semibold text-red-900  py-1 px-2 w-fit">Otkazana</div>
}
