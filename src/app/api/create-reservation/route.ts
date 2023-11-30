import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import userModel from "@/models/user"
import listingModel from "@/models/listing"
import { authOptions } from "@/tools/authOptions"
import reservationModel from "@/models/reservation"
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    await connectMongo()
    const { listingId, firstName, lastName, phoneNumber, email, day, startTime, endTime } = await req.json()

    if (!session || !session.user) return NextResponse.json({ message: "Korisnik nije autorizovan.", success: false })
    const user = await userModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ success: false, message: "Došlo je do greške. Pokušajte ponovo kasnije." })

    const dayDate = new Date(day).getDate()

    const startHours = startTime.split(":")[0]
    const startMinutes = startTime.split(":")[1]
    const startDate = new Date()

    startDate.setDate(dayDate)
    startDate.setHours(startHours)
    startDate.setMinutes(startMinutes)

    const endHours = endTime.split(":")[0]
    const endMinutes = endTime.split(":")[1]
    const endDate = new Date()
    endDate.setDate(dayDate)
    endDate.setHours(endHours)
    endDate.setMinutes(endMinutes)

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
        status: "open",
    })

    return NextResponse.json({ success: true, message: "Uspešno kreirana rezervacija.", reservationId: newReservation.id })
}
