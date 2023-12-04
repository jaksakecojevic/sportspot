"use client"
import { LinkObject, Listing } from "@/types"
import { faUser, faBuilding, faCalendar, faEdit } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ListingHeader({ listing }: { listing: Listing }) {
    const pathname = usePathname()
    const links: LinkObject[] = [
        {
            url: `/nalog/objekti/${listing._id}`,
            children: (
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCalendar} />
                    Kalendar
                </div>
            ),
            highlightOnlyIfUrlEqual: true,
        },
        {
            url: `/nalog/objekti/${listing._id}/edit`,
            children: (
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faEdit} />
                    Izmena
                </div>
            ),
        },
    ]
    return (
        <div className="px-sideSpace bg-primaryDarker w-full flex">
            {links.map((link, index) => {
                let shouldHighlight
                if (link.highlightOnlyIfUrlEqual == true) {
                    shouldHighlight = link.url == pathname
                } else {
                    shouldHighlight = pathname.includes(link.url)
                }
                return (
                    <Link key={index} href={link.url} className={`${shouldHighlight ? "border-primaryLighter" : "border-transparent"} text-white px-4 py-2 rounded-sm border-b-4 duration-200 flex items-center gap-2 hover:bg-primary bg-primaryDarker font-medium transition-all`}>
                        {link.children}
                    </Link>
                )
            })}
        </div>
    )
}
