import React from "react"
import { authOptions } from "@/tools/authOptions"
import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AccountHeader from "@/components/account/AccountHeader"
import AccountFooter from "@/components/account/AccountFooter"
import AccountLoading from "./loading"

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return redirect("/login")
    await connectMongo()
    return (
        <div className="min-h-screen flex flex-col">
            <AccountHeader />
            {children}
            <AccountFooter />
        </div>
    )
}
