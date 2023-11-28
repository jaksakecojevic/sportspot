"use client"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"
export default function LogoutButton() {
    return (
        <button className="px-2 py-1 w-fit rounded-lg flex items-center gap-2 mt-auto bg-red-500 text-white text-left hover:bg-red-600 transition-colors" onClick={() => signOut()}>
            <FontAwesomeIcon icon={faSignOut} />
            Izloguj se
        </button>
    )
}
