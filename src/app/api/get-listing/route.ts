import listingModel from "@/models/listing"
import { connectMongo } from "@/tools/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")

    await connectMongo()
    const listing = await listingModel.findById(id)

    return NextResponse.json(listing)
}
