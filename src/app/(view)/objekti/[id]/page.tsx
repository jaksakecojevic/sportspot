import listingModel from "@/models/listing"
import ListingPage from "@/components/listing/ListingPage"
import { connectMongo } from "@/tools/db"

export default async function page({ params }: { params: { id: string } }) {
    await connectMongo()
    const listing = await listingModel.findById(params.id)
    return <ListingPage listing={listing} />
}
