"use client"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faSignIn } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Session } from "next-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function HeaderLinks({ session }: { session: Session | null }) {
    const pathname = usePathname()

    if (session && session.user) {
        return (
            <Link className={`${pathname.includes("/nalog") ? "border-primary" : "border-transparent"} font-medium px-4 py-4 rounded-sm border-b-4  hover:border-primary transition-border duration-200 flex items-center gap-2`} href={"/nalog"}>
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden sm:block">{session.user.name}</span>
            </Link>
        )
    } else {
        return (
            <>
                <Link href={"/register"} className={`${pathname == "/register" ? "border-primary" : "border-transparent"} hidden sm:block font-medium px-4 py-4 sm: rounded-sm border-b-4  hover:border-primary transition-border duration-200`}>
                    Registracija
                </Link>
                <Link href={"/login"} className={`${pathname == "/login" ? "border-primary" : "border-transparent"} font-medium px-4 py-4 rounded-sm border-b-4  hover:border-primary transition-border duration-200`}>
                    <span className="hidden sm:block">Prijava</span>
                    <span className="block sm:hidden">
                        <FontAwesomeIcon icon={faSignIn} />
                    </span>
                </Link>
            </>
        )
    }
}
