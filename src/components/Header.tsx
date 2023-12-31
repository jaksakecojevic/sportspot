import { authOptions } from "@/tools/authOptions"

import { getServerSession } from "next-auth"

import Link from "next/link"
import HeaderLinks from "./HeaderLinks"

export default async function Header() {
    const session = await getServerSession(authOptions)

    return (
        <header className="px-sideSpace bg-white flex justify-between items-center shadow-primary sticky top-0 z-10">
            <Link href={"/"} className="font-black italic text-3xl ">
                SportSpot
            </Link>
            <div className="flex gap-1">
                <HeaderLinks session={session} />
            </div>
        </header>
    )
}
