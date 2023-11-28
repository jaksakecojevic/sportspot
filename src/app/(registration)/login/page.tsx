import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import LoginForm from "@/components/LoginForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Login() {
    const session = await getServerSession(authOptions)
    if (session) return redirect("/")
    return <LoginForm />
}
