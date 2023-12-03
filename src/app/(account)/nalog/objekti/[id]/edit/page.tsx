import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import EditListingForm from "@/components/account/EditListingForm"

export default async function page({ params }: { params: { id: string } }) {
    await connectMongo()
    const listing = await listingModel.findById(params.id)
    return <EditListingForm listing={serializeData(listing)} />
}
