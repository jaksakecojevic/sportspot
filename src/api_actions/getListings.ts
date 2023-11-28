import { Category } from "@/types"

type GetListingsProps = {
    query?: string
    category?: Category
    sort?: "cheap" | "expensive"
}
export default async function getListings(props?: GetListingsProps) {
    const url = new URL(window.location.origin + "/api/get-listings")
    if (props?.query) url.searchParams.set("query", props?.query)
    if (props?.category) url.searchParams.set("category", props?.category)
    if (props?.sort) url.searchParams.set("sort", props?.sort)
    const res = await fetch(url, {
        method: "GET",
    })
    return await res.json()
}
