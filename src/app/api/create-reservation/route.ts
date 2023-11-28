import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import userModel from "@/models/user"
import listingModel from "@/models/listing"
import { authOptions } from "@/tools/authOptions"
import reservationModel from "@/models/listing"
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    await connectMongo()
    const { listingId, firstName, lastName, phoneNumber, email, startDate, endDate } = await req.json()

    var user

    if (session && session.user) {
        user = await userModel.findOne({ email: session.user.email })
    }

    const newReservation = await reservationModel.create({
        ownerId: user.id,
        listingId,
        clientInfo: {
            firstName,
            lastName,
            phoneNumber,
            email,
        },
        startDate,
        endDate,
    })

    return NextResponse.json({ success: true, message: "Uspešno kreirana rezervacija." })
}
