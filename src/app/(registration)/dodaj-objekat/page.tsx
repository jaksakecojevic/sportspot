import AddListingForm from "@/components/AddListingForm"
import { authOptions } from "@/tools/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function addListing() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect("/")
    return <AddListingForm />
}
