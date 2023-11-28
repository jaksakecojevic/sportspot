import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddListingForm from "@/components/AddListingForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function addListing() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect("/")
    return <AddListingForm />
}
