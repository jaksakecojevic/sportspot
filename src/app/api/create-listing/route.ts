import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import userModel from "@/models/user"
import listingModel from "@/models/listing"
import { authOptions } from "@/tools/authOptions"
import sanitize from "@/tools/sanitize"

import { eurConversionRate } from "@/tools/config"
import { toSearchableString } from "@/tools/normalizeString"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return NextResponse.json({ message: "Korisnik nije autorizovan.", success: false })
    await connectMongo()
    const { title, description, images, priceAmount, currency, city, street, category, free } = await req.json()
    const user = await userModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ success: false, message: "Došlo je do greške. Pokušajte ponovo kasnije." })
    const maxCharacters = 600
    if (description.length > maxCharacters) return NextResponse.json({ success: false, message: `Opis može sadržati maksimalno ${maxCharacters} karaktera.` })

    var amountInRsd = priceAmount

    if (currency == "EUR") {
        amountInRsd = priceAmount * eurConversionRate
    }

    const newListing = await listingModel.create({
        ownerId: user.id,
        title: title,
        searchString: toSearchableString(title),
        description: sanitize(description),
        images: images,
        pricePerHour: {
            amount: priceAmount,
            amountInRsd,
            currency,
        },
        address: {
            city,
            street,
        },
        reservations: [],
        category,
    })
    return NextResponse.json({ success: true, message: "Uspešno kreiran objekat.", listingId: newListing.id })
}
