import { Listing } from "@/types"
import Link from "next/link"

export default function ListingRow({ listing }: { listing: Listing }) {
    const url = `/objekti/${listing._id}`

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 border-2 border-gray-200 rounded-lg">
            <Link href={url} className="w-full lg:w-fit self-center block ">
                <img src={listing.images[0].url || "/notFound.jpg"} className="rounded-lg object-cover w-full lg:w-[500px] h-[200px]" width={500} alt="" />
            </Link>
            <div className="basis-full">
                <Link href={url} className="font-black text-xl text-primaryLighter hover:text-primaryDarker block transition-colors">
                    {listing.title}
                </Link>
                <Link href={url} className="underline font-semibold text-primaryLighter block">
                    {listing.address.city}
                </Link>
                <Description description={listing.description} url={url} />
                <div className="flex gap-2 items-center mt-4 text-lg ">
                    <span className="font-black  text-primary">
                        {listing.pricePerHour.amount} {listing.pricePerHour.currency}
                    </span>
                    <div>za 1h</div>
                </div>
                {listing.pricePerHour.currency != "RSD" ? <div className="text-primary text-xs">{listing.pricePerHour.amountInRsd} RSD</div> : ""}
            </div>
            <div className="basis-1/5 flex justify-end items-baseline">
                <Link href={url} className="w-full text-center sm:w-fit px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primaryDarker transition-colors duration-200">
                    Detaljnije
                </Link>
            </div>
        </div>
    )
}

function Description({ description, url }: { description: string; url: string }) {
    const limitDescription = (description: string, limit: number) => {
        if (description.length > limit) {
            return description.substring(0, limit) + "..."
        }
        return description
    }
    return (
        <>
            <p className={`hidden sm:block text-sm ${!limitDescription(description, 250).includes(" ") ? "break-all" : ""}`}>
                {limitDescription(description, 250)}{" "}
                {description.length > 250 ? (
                    <Link href={url} className="hover:underline font-semibold text-primary">
                        Čitaj još
                    </Link>
                ) : (
                    ""
                )}
            </p>
            <p className={`block sm:hidden text-sm ${!limitDescription(description, 120).includes(" ") ? "break-all" : ""}`}>{limitDescription(description, 120)}</p>
        </>
    )
}
