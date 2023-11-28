import userModel from "@/models/user"
import { connectMongo } from "@/tools/db"
import { hash } from "@/tools/hash"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST }
