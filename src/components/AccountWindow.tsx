"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AccountWindow({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <div className="w-full flex justify-center px-sideSpace pt-24 pb-96">
            <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col sm:flex-row gap-4 w-full sm:min-h-[400px]">
                <div className="flex flex-col gap-1 sm:max-w-[160px] h-full flex-1">
                    <Link href="/nalog" className={`px-2 py-1 rounded-lg   transition-colors ${pathname == "/nalog" ? "bg-primary text-white hover:bg-primaryDarker" : "bg-gray-200 hover:bg-gray-300"}`}>
                        Nalog
                    </Link>
                    <Link href="/nalog/rezervacije" className={`px-2 py-1 rounded-lg   transition-colors ${pathname == "/nalog/rezervacije" ? "bg-primary text-white hover:bg-primaryDarker" : "bg-gray-200 hover:bg-gray-300"}`}>
                        Rezervacije
                    </Link>
                    <Link href="/nalog/objekti" className={`px-2 py-1 rounded-lg   transition-colors ${pathname == "/nalog/objekti" ? "bg-primary text-white hover:bg-primaryDarker" : "bg-gray-200 hover:bg-gray-300"}`}>
                        Objekti
                    </Link>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
