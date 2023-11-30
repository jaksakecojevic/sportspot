import { connectMongo } from "@/tools/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/user"
import { authOptions } from "@/tools/authOptions"
import reservationModel from "@/models/reservation"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) return NextResponse.json({ message: "Korisnik nije autorizovan.", success: false })

    const { reservationId } = await req.json()

    await connectMongo()

    const user = await userModel.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({ success: false, message: "Došlo je do greške. Pokušajte ponovo kasnije." })
    const reservation = await reservationModel.findById(reservationId)

    if (!reservation) return NextResponse.json({ success: false, message: "Rezervacija nije pronadjena." })
    if (reservation.ownerId != user.id) return NextResponse.json({ success: false, message: "Korisnik nije autorizovan za ovu radnju." })

    await reservation.updateOne({ status: "cancelled" })

    console.log(reservation)

    return NextResponse.json({ success: true, message: "Uspešno otkazana rezervacija." })
}
