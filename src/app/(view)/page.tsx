import { v4 } from "uuid"
import { Listing } from "@/types"
import Image from "next/image"
import ListingRows from "@/components/ListingRows"
import SearchBar from "@/components/SearchBar"

export default function Home() {
    const listings: Listing[] = [
        {
            id: "07fe0a6c-9c48-4fd4-b8bf-a8df9f7bbd0a",
            title: "Fudbalski balon Južni Bulevar",
            description: "Teren je standardnih dimenzija i opremljen je kvalitetnom veštačkom travom, obezbeđujući optimalne uslove za igru. Osim toga, poseduje i modernu LED rasvetu koja omogućava igranje i tokom večernjih sati.",
            images: ["https://www.balon-zvezda-ada.rs/wp-content/uploads/2013/03/IMG_7306.jpg"],
            pricePerHour: {
                amount: 4000,
                currencyCode: "RSD",
            },
            address: {
                street: "Južni Bulevar",
                city: "Beograd",
            },
        },
        {
            id: "1a2b3c4d-5e6f-7g8h-9i0j",
            title: "Košarkaški Teren Dorćol Dome",
            description: "Unutrašnji košarkaški teren sa profesionalnim podlogama, pogodan za treninge i utakmice. Opremljen elektronskim semaforom i mestima za sedenje za gledaoce.",
            images: ["https://www.boma-court.com/images/portfolio/basketball.jpg"],
            pricePerHour: {
                amount: 4500,
                currencyCode: "RSD",
            },
            address: {
                street: "Dorćol",
                city: "Beograd",
            },
        },
        {
            id: "2b3c4d5e-6f7g-8h9i-0j1k",
            title: "Teniski Teren Banjica",
            description: "Otvoreni teniski tereni sa tvrdom podlogom, idealni za igrače svih nivoa. Teren je opremljen osvetljenjem za noćne mečeve.",
            images: ["https://konstruktiva.rs/wp-content/uploads/2016/06/teniski-teren-ribarska-banja-3.jpg"],
            pricePerHour: {
                amount: 3000,
                currencyCode: "RSD",
            },
            address: {
                street: "Banjica",
                city: "Beograd",
            },
        },
        {
            id: "3c4d5e6f-7g8h-9i0j-1k2l",
            title: "Fudbalski Teren Zvezdara Arena",
            description: "Veliki otvoreni fudbalski teren sa prirodnom travom, idealan za turnire i rekreativne utakmice.",
            images: ["https://membraning.com/wp-content/uploads/2017/12/balon_hala_vesko_2013_6.jpg"],
            pricePerHour: {
                amount: 5000,
                currencyCode: "RSD",
            },
            address: {
                street: "Zvezdara",
                city: "Beograd",
            },
        },
        {
            id: "4d5e6f7g-8h9i-0j1k-2l3m",
            title: "Plivalište Tašmajdan",
            description: "Olimpijski bazen sa savremenim uslovima za plivanje i vaterpolo. Pogodan za treninge, takmičenja i rekreativno plivanje.",
            images: ["https://tasmajdan.rs/wp-content/uploads/2022/12/DSC_6690aS-scaled.jpg"],
            pricePerHour: {
                amount: 6000,
                currencyCode: "RSD",
            },
            address: {
                street: "Tašmajdan",
                city: "Beograd",
            },
        },
        {
            id: "5e6f7g8h-9i0j-1k2l-3m4n",
            title: "Sala za Badminton Novi Beograd",
            description: "Moderne sale za badminton sa kvalitetnim podlogama i opremom. Pogodno za sve nivoe igrača, od početnika do profesionalaca.",
            images: ["https://badmintonklubpancevo.files.wordpress.com/2013/06/milorad-sala.jpg"],
            pricePerHour: {
                amount: 3500,
                currencyCode: "RSD",
            },
            address: {
                street: "Novi Beograd",
                city: "Beograd",
            },
        },
    ]

    return (
        <div className="px-sideSpace py-4">
            <SearchBar />
            <div>
                <ListingRows listings={listings} />
            </div>
        </div>
    )
}
