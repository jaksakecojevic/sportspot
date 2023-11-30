import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import ManageListingPage from "@/components/listing/ManageListingPage"
import reservationModel from "@/models/reservation"

export default async function page({ params }: { params: { id: string } }) {
    await connectMongo()
    const listing = await listingModel.findById(params.id)
    const reservations = await reservationModel.find({ listingId: params.id })
    return <ManageListingPage listing={serializeData(listing)} reservations={serializeData(reservations)} />
}
