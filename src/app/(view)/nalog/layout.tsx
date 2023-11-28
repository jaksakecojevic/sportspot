import React from "react"
import { authOptions } from "@/tools/authOptions"
import AccountWindow from "@/components/AccountWindow"
import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import serializeData from "@/tools/serializeData"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()

    return <AccountWindow>{children}</AccountWindow>
}
