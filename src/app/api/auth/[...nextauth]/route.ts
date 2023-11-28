import userModel from "@/models/user"
import { authOptions } from "@/tools/authOptions"
import { connectMongo } from "@/tools/db"
import { hash } from "@/tools/hash"
import NextAuth, { User } from "next-auth"

const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST }
