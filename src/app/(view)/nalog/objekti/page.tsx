import { authOptions } from "@/tools/authOptions"
import listingModel from "@/models/listing"
import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function MyListings() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    const user = await userModel.findOne({ email: session.user.email })
    const listings = await listingModel.find({ ownerId: user.id })

    return (
        <div>
            <Link className="bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-2 font-bold hover:bg-green-800 transition-colors" href={"/dodaj-objekat"}>
                <FontAwesomeIcon icon={faAdd} className="block" />
                Dodaj objekat
            </Link>
            {listings.map((listing) => {
                return <div>{listing.title}</div>
            })}
        </div>
    )
}
