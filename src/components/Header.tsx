import { faSignIn } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function Header() {
    return (
        <header className="px-sideSpace bg-white flex justify-between items-center shadow-primary sticky top-0">
            <Link href={"/"} className="font-black italic text-3xl ">
                SportSpot
            </Link>
            <div className="flex gap-1">
                <Link href={"/register"} className={"hidden sm:block font-medium px-4 py-4 sm: rounded-sm border-b-4 border-transparent hover:border-primary transition-border duration-200"}>
                    Registracija
                </Link>
                <Link href={"/login"} className={"font-medium px-4 py-4 rounded-sm border-b-4 border-transparent hover:border-primary transition-border duration-200"}>
                    <span className="hidden sm:block">Prijava</span>
                    <span className="block sm:hidden">
                        <FontAwesomeIcon icon={faSignIn} />
                    </span>
                </Link>
            </div>
        </header>
    )
}
