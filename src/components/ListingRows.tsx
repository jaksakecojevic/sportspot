import { Listing } from "@/types"
import ListingRow from "./ListingRow"

export default function ListingRows({ listings }: { listings: Listing[] }) {
    return (
        <div className="flex flex-col gap-4">
            {listings.map((listing, index) => {
                return <ListingRow listing={listing} key={index} />
            })}
        </div>
    )
}
