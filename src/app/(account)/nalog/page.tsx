import { authOptions } from "@/tools/authOptions"
import LogoutButton from "@/components/account/LogoutButton"
import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { countries } from "countries-list"
import { getFlagEmoji } from "@/tools"

export default async function Account() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    const user = await userModel.findOne({ email: session.user.email })

    return (
        <div className="flex flex-col gap-2 justify-between h-full px-sideSpace py-4">
            <h2 className="text-xl font-semibold mb-4">Moj nalog</h2>
            <div className="flex gap-2 items-center">
                Ime: <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">{user?.firstName}</div>
            </div>
            <div className="flex gap-2 items-center">
                Prezime: <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">{user?.lastName}</div>
            </div>
            <div className="flex gap-2 items-center">
                Email: <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">{user?.email}</div>
            </div>
            <div className="flex gap-2 items-center">
                Telefon: <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">{user?.phoneNumber}</div>
            </div>
            <div className="flex gap-2 items-center">
                Država:{" "}
                <div className="p-1 bg-gray-100 rounded-lg border-2 border-gray-300">
                    {/* @ts-ignore */}
                    {countries[user?.countryCode].name} {getFlagEmoji(user.countryCode)}
                </div>
            </div>

            <LogoutButton />
        </div>
    )
}
