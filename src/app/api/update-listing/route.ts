import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import userModel from "@/models/user"
import listingModel from "@/models/listing"
import { authOptions } from "@/tools/authOptions"

import { eurConversionRate } from "@/tools/config"
import { toSearchableString } from "@/tools/normalizeString"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return NextResponse.json({ message: "Korisnik nije autorizovan.", success: false })

    const { listingId, title, description, images, priceAmount, currency, city, street, category, free } = await req.json()

    await connectMongo()

    const user = await userModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ success: false, message: "Došlo je do greške. Pokušajte ponovo kasnije." })

    const listing = await listingModel.findById(listingId)
    if (!listing) return NextResponse.json({ success: false, message: "Objekat nije pronadjen." })
    if (listing.ownerId != user.id) return NextResponse.json({ success: false, message: "Korisnik nije autorizovan za ovu radnju." })

    const update: any = {}

    if (title) {
        update.title = title

        update.searchString = toSearchableString(title)
    }
    if (description) update.description = description
    if (priceAmount) {
        update["pricePerHour.amount"] = priceAmount
        if (listing.currency == "EUR" || currency == "EUR") {
            update["pricePerHour.amountInRsd"] = priceAmount * eurConversionRate
        } else if (currency == "RSD") {
            update["pricePerHour.amountInRsd"] = priceAmount
        }
    }
    if (currency) {
        update["pricePerHour.currency"] = currency
        if (listing.currency == "EUR" || currency == "EUR") {
            update["pricePerHour.amountInRsd"] = priceAmount * eurConversionRate
        } else if (currency == "RSD") {
            update["pricePerHour.amountInRsd"] = priceAmount
        }
    }
    if (city) update["address.city"] = city
    if (street) update["address.street"] = street
    if (category) update.category = category
    if (images) update.images = images

    await listing.updateOne(update)

    return NextResponse.json({ success: true, message: "Uspešno izmenjen objekat." })
}
