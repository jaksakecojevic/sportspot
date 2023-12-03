import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"

import reservationModel from "@/models/reservation"
import ReservationPage from "@/components/account/ReservationPage"

export default async function page({ params }: { params: { id: string } }) {
    await connectMongo()
    const reservation = await reservationModel.findById(params.id)
    return <ReservationPage reservation={serializeData(reservation)} />
}
