"use client"
import { LinkObject } from "@/types"
import { faBuilding, faUser } from "@fortawesome/free-regular-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import HamburgerButton from "../HamburgerButton"

export default function AccountHeader() {
    const links: LinkObject[] = [
        {
            url: "/nalog",
            children: (
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faUser} />
                    Nalog
                </div>
            ),
            highlightOnlyIfUrlEqual: true,
        },
        {
            url: "/nalog/objekti",
            children: (
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faBuilding} />
                    Objekti
                </div>
            ),
        },
        {
            url: "/nalog/rezervacije",
            children: (
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCalendar} />
                    Rezervacije
                </div>
            ),
        },
    ]
    return (
        <header className="px-sideSpace bg-primary">
            <div className="hidden md:flex">
                {links.map((link, index) => {
                    return <HeaderLink link={link} key={index} />
                })}
            </div>
            <div className="md:hidden">
                <HamburgerButton links={links} />
            </div>
        </header>
    )
}
function HeaderLink({ link }: { link: LinkObject }) {
    const pathname = usePathname()
    let shouldHighlight
    if (link.highlightOnlyIfUrlEqual == true) {
        shouldHighlight = link.url == pathname
    } else {
        shouldHighlight = pathname.includes(link.url)
    }

    return (
        <Link href={link.url} className={`${shouldHighlight ? "border-secondary" : "border-transparent"} text-white px-4 py-2 rounded-sm border-b-4 duration-200 flex items-center gap-2 hover:bg-primaryDarker bg-primary font-medium transition-all`}>
            {link.children}
        </Link>
    )
}
