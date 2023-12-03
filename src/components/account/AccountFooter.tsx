import Link from "next/link"

export default function AccountFooter() {
    return (
        <footer className="px-sideSpace bg-secondary py-4 mt-auto">
            <div className="flex flex-col gap-4">
                <Link href={"/"} className="font-bold">
                    Idi na početnu
                </Link>
                <Link href={"/dodaj-objekat"} className="font-bold">
                    Kreiraj objekat
                </Link>
            </div>
        </footer>
    )
}
