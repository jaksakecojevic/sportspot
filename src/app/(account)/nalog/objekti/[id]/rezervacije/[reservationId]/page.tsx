import ManageReservationPage from "@/components/account/ManageReservationPage"
import listingModel from "@/models/listing"
import reservationModel from "@/models/reservation"
import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"

export default async function page({ params }: { params: { reservationId: string } }) {
    await connectMongo()
    const reservation = await reservationModel.findById(params.reservationId)
    const listing = await listingModel.findById(reservation.listingId)
    const user = await userModel.findById(reservation.ownerId)

    return <ManageReservationPage reservation={serializeData(reservation)} listing={listing} user={serializeData(user)} />
}
