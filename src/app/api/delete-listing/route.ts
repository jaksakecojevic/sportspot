import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import userModel from "@/models/user"
import listingModel from "@/models/listing"
import { authOptions } from "@/tools/authOptions"
import { ImageType } from "@/types"
import { storage } from "@/tools/firebaseAdmin"
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return NextResponse.json({ message: "Korisnik nije autorizovan.", success: false })

    const { listingId } = await req.json()

    await connectMongo()

    const user = await userModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ success: false, message: "Došlo je do greške. Pokušajte ponovo kasnije." })

    const listing = await listingModel.findById(listingId)
    if (!listing) return NextResponse.json({ success: false, message: "Objekat nije pronadjen." })
    if (listing.ownerId != user.id) return NextResponse.json({ success: false, message: "Korisnik nije autorizovan za ovu radnju." })

    listing.images.forEach(async (image: ImageType) => {
        await storage.bucket().deleteFiles({
            prefix: `listingImages/${image.id}/`,
        })
    })

    await listing.deleteOne()

    return NextResponse.json({ success: true, message: "Uspešno obrisan objekat." })
}
