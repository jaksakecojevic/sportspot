import userModel from "@/models/user"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongo } from "./db"
import { hash } from "./hash"
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            authorize: authorize as any,
        }),
    ],
    session: {
        strategy: "jwt" as any,
        maxAge: 3000,
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async signIn({ user }: { user: { error?: string } }) {
            if (user?.error) throw new Error(user.error)
            return true
        },
    },
}

async function authorize(credentials: any, req: any) {
    const { email, password } = credentials
    await connectMongo()
    const user = await userModel.findOne({ email })
    if (!user) return { error: "Pogrešna šifra ili email." }

    const hashedPassword = hash(password)

    if (hashedPassword !== user.password) return { error: "Pogrešna šifra ili email." }

    return {
        id: user.id,
        email: user.email,
        name: user.firstName,
    }
}
