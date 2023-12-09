import userModel from "@/models/user"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { connectMongo } from "./db"
import { hash } from "./hash"
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            authorize: authorize as any,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        signIn,
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

async function signIn({ user, account }: any) {
    const { name, email, image } = user
    if (user?.error) throw new Error(user.error)
    if (account.provider == "google") {
        await connectMongo()
        const userExists = await userModel.findOne({ email })
        if (!userExists) {
            const firstName = name.split(" ")[0]
            const lastName = name.split(" ")[1]
            const newUser = await userModel.create({
                firstName,
                lastName,
                email: email,
                avatarUrl: image,
            })
            return newUser
        }
        return userExists
    } else {
        await connectMongo()
        const user_db = await userModel.findOne({ email })
        return user_db
    }
}
