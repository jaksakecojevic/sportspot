import listingModel from "@/models/listing"
import ListingPage from "@/components/listing/ListingPage"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import { awaitTimeout } from "@/tools"

export default async function page({ params }: { params: { id: string } }) {
    await connectMongo()
    const listing = await listingModel.findById(params.id)
    return <ListingPage listing={serializeData(listing)} />
}
