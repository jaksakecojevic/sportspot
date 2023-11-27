import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { hash } from "@/tools/hash"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { firstName, lastName, email, password } = await req.json()
    await connectMongo()
    const minimumPasswordLength = 6
    if (password.length < minimumPasswordLength) {
        return NextResponse.json({ success: false, message: "Password must contain at least 6 characters." })
    }
    const user = await userModel.findOne({ email })
    if (user) {
        return NextResponse.json({ success: false, message: "User with this email already exists." })
    }
    const hashedPassword = hash(password)
    await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })
    return NextResponse.json({ success: true, message: "User successfully registered." })
}
