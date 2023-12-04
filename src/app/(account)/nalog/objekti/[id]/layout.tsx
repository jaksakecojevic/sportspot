import ListingHeader from "@/components/account/ListingHeader"
import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"

export default async function layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    await connectMongo()
    const listing = await listingModel.findById(params.id)
    return (
        <div>
            <ListingHeader listing={serializeData(listing)} />
            {children}
        </div>
    )
}
