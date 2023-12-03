import ReservationsTable from "@/components/account/ReservationsTable"
import listingModel from "@/models/listing"
import reservationModel from "@/models/reservation"
import userModel from "@/models/user"
import { authOptions } from "@/tools/authOptions"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import { Listing, Reservation } from "@/types"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Reservations() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    const user = await userModel.findOne({ email: session.user.email })
    const reservations: Reservation[] = await reservationModel.find({ ownerId: user.id }).sort({ startDate: -1 })
    return (
        <div className="px-sideSpace py-4">
            <h2 className="text-xl font-semibold mb-4">Moje rezervacije</h2>
            <ReservationsTable reservations={serializeData(reservations)} />
        </div>
    )
}
