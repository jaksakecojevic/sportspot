import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
// @ts-ignore
import convert from "cyrillic-to-latin"
export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")
    const category = req.nextUrl.searchParams.get("category")
    const sort = req.nextUrl.searchParams.get("sort")

    var filter: any = {}

    if (query) {
        filter.searchString = { $regex: new RegExp(convert(query), "i") }
    }

    if (category && category != "all") {
        filter.category = category
    }

    var sortObject: any = {}

    if (sort) {
        if (sort == "cheap") {
            sortObject = { "pricePerHour.amount": -1 }
        }
        if (sort == "expensive") {
            sortObject = { "pricePerHour.amount": 1 }
        }
    }
    await connectMongo()
    const listings = await listingModel.find(filter).sort(sortObject)

    return NextResponse.json(listings)
}
