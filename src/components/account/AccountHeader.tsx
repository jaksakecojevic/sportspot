"use client"
import { faBuilding, faUser } from "@fortawesome/free-regular-svg-icons"
import { faCalendar, faCity, faClose, faFootball, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
type LinkObject = {
    url: string
    children: React.ReactNode
    highlightOnlyIfUrlEqual?: boolean
}
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
        <Link href={link.url} className={`${shouldHighlight ? "border-secondary" : "border-transparent"} text-white px-4 py-4 rounded-sm border-b-4 duration-200 flex items-center gap-2 hover:bg-primaryDarker bg-primary font-semibold text-lg transition-all`}>
            {link.children}
        </Link>
    )
}
function HamburgerButton({ links }: { links: LinkObject[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex justify-end">
            <button className="flex flex-col gap-2 h-full w-[48px] p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span className="w-full h-[2px] rounded-full bg-white"></span>
                <span className="w-full h-[2px] rounded-full bg-white"></span>
                <span className="w-full h-[2px] rounded-full bg-white"></span>
            </button>
            {sidebarOpen ? <Sidebar links={links} setSidebarOpen={setSidebarOpen} /> : ""}
        </div>
    )
}
function Sidebar({ links, setSidebarOpen }: { links: LinkObject[]; setSidebarOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="fixed top-0 right-0 bg-primary h-screen border-l-2 border-primaryDarker z-10">
            {links.map((link, index) => {
                const pathname = usePathname()
                let shouldHighlight
                if (link.highlightOnlyIfUrlEqual == true) {
                    shouldHighlight = link.url == pathname
                } else {
                    shouldHighlight = pathname.includes(link.url)
                }
                return (
                    <Link href={link.url} className={`${shouldHighlight ? "bg-primaryDarker" : ""} flex items-center gap-2 py-2 pl-4 pr-8 bg-primary text-white font-semibold hover:bg-primaryDarker transition-colors`}>
                        {link.children}
                    </Link>
                )
            })}
            <button onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 py-2 pl-4 pr-8 bg-primary text-white font-semibold w-full hover:bg-primaryDarker transition-colors">
                <FontAwesomeIcon icon={faClose} /> Zatvori
            </button>
        </div>
    )
}
