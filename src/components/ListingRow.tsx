import { Listing } from "@/types"
import Link from "next/link"

export default function ListingRow({ listing }: { listing: Listing }) {
    const url = `/objekti/${listing._id}`
    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 border-2 border-gray-200 rounded-lg">
            <Link href={url} className="w-full lg:w-fit self-center block">
                <img src={listing.images[0] || "/notFound.jpg"} className="rounded-lg object-cover w-full lg:w-[500px] h-[200px]" width={500} alt="" />
            </Link>
            <div className="basis-full">
                <Link href={url} className="font-black text-xl text-primaryLighter hover:text-primaryDarker block transition-colors">
                    {listing.title}
                </Link>
                <Link href={url} className="underline font-semibold text-primaryLighter block">
                    {listing.address.city}
                </Link>
                <p className="text-sm">{listing.description}</p>
            </div>
            <div className="basis-1/5 flex justify-end items-baseline">
                <Link href={url} className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primaryDarker transition-colors duration-200">
                    Detaljnije
                </Link>
            </div>
        </div>
    )
}
