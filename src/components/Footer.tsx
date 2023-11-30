"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Footer() {
    const session = useSession()
    return (
        <footer className="">
            <div className="px-sideSpace py-4 bg-primary">
                <p className="font-semibold text-white text-xl">SportSpot 2023.</p>
                <div className=" text-white">
                    {session.status == "authenticated" ? (
                        <>
                            <Link href="/nalog" className="block w-fit mt-3">
                                Nalog
                            </Link>
                            <Link href="/nalog/rezervacije" className="block w-fit mt-3">
                                Rezervacije
                            </Link>
                            <Link href="/nalog/objekti" className="block w-fit mt-3">
                                Objekti
                            </Link>
                            <Link href="/dodaj-objekat" className="block w-fit mt-3">
                                Objavi svoj objekat
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/register" className="block w-fit mt-3">
                                Registracija
                            </Link>
                            <Link href="/login" className="block w-fit mt-3">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="bg-secondary px-sideSpace py-4 font-black">NetNinjas</div>
        </footer>
    )
}
