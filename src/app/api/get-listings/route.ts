import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"

import { NextRequest, NextResponse } from "next/server"

import { toSearchableString } from "@/tools/normalizeString"
export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")
    const category = req.nextUrl.searchParams.get("category")
    const sort = req.nextUrl.searchParams.get("sort")

    var filter: any = {}

    if (query) {
        filter.searchString = { $regex: new RegExp(toSearchableString(query), "i") }
    }

    if (category && category != "all") {
        filter.category = category
    }

    var sortObject: any = {}

    if (sort) {
        if (sort == "cheap") {
            sortObject = { "pricePerHour.amountInRsd": -1 }
        }
        if (sort == "expensive") {
            sortObject = { "pricePerHour.amountInRsd": 1 }
        }
    }
    await connectMongo()
    const listings = await listingModel.find(filter).sort(sortObject)

    return NextResponse.json(listings)
}
