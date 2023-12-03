import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { hash } from "@/tools/hash"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { firstName, lastName, email, phoneNumber, countryCode, password } = await req.json()

    if (password.length < 6) {
        return NextResponse.json({ success: false, message: "Šifra mora imati najmanje 6 karaktera." })
    }
    if (!firstName || !lastName || !email || !phoneNumber || !password || !countryCode) {
        return NextResponse.json({ success: false, message: "Loš zahtev." })
    }
    await connectMongo()
    const user = await userModel.findOne({ email })
    if (user) {
        return NextResponse.json({ success: false, message: "Korisnik sa ovom email adresom već postoji." })
    }
    const hashedPassword = hash(password)
    await userModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        password: hashedPassword,
    })
    return NextResponse.json({ success: true, message: "Uspešna registracija." })
}
