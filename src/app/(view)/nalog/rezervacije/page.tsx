import ReservationWidget from "@/components/ReservationWidget"
import listingModel from "@/models/listing"
import reservationModel from "@/models/reservation"
import userModel from "@/models/user"
import { authOptions } from "@/tools/authOptions"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import { Listing, Reservation } from "@/types"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Reservations() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    const user = await userModel.findOne({ email: session.user.email })
    const reservations: Reservation[] = await reservationModel.find({ ownerId: user.id })
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Moje rezervacije</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {serializeData(reservations).map((reservation: Reservation, index: number) => {
                    return <ReservationWidget key={index} reservation={reservation} />
                })}
            </div>
        </div>
    )
}
