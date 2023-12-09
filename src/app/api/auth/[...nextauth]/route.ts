import { authOptions } from "@/tools/authOptions"
import NextAuth, { User } from "next-auth"

const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST }
