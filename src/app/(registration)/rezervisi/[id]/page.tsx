import listingModel from "@/models/listing"
import ListingPage from "@/components/listing/ListingPage"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import ReserveListingForm from "@/components/ReserveListingForm"
import { authOptions } from "@/tools/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import userModel from "@/models/user"

export default async function page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/")
    await connectMongo()

    const listing = await listingModel.findById(params.id)
    const user = await userModel.findOne({ email: session.user.email })
    return <ReserveListingForm user={serializeData(user)} listing={serializeData(listing)} />
}
