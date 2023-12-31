import { authOptions } from "@/tools/authOptions"
import listingModel from "@/models/listing"
import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import serializeData from "@/tools/serializeData"
import { Listing } from "@/types"

export default async function MyListings() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    const user = await userModel.findOne({ email: session.user.email })
    const listings: Listing[] = await listingModel.find({ ownerId: user.id })

    return (
        <div className="px-sideSpace py-4">
            <h2 className="text-xl font-semibold mb-4">Moji objekti</h2>
            <Link className="bg-green-600 w-fit text-white px-2 py-1 rounded-lg flex items-center gap-2 font-bold hover:bg-green-800 transition-colors" href={"/dodaj-objekat"}>
                <FontAwesomeIcon icon={faAdd} className="block" />
                Dodaj objekat
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {serializeData(listings).map((listing: Listing, index: number) => {
                    return <ListingCard listing={listing} key={index} />
                })}
            </div>
        </div>
    )
}

function ListingCard({ listing }: { listing: Listing }) {
    const maxCharacters = 100
    const limitDescription = (description: string) => {
        if (description.length > maxCharacters) {
            return description.substring(0, maxCharacters) + "..."
        }
        return description
    }
    return (
        <Link href={`/nalog/objekti/${listing._id}`} className="block p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-200 transition-colors">
            <img src={listing.images[0].url} className="w-full aspect-square object-cover rounded-lg" alt="" />
            <p className="font-semibold ">{listing.title}</p>
            <p className="text-sm overflow-hidden">{limitDescription(listing.description)}</p>
        </Link>
    )
}
