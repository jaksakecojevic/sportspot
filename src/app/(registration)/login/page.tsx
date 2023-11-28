import LoginForm from "@/components/LoginForm"
import { authOptions } from "@/tools/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Login() {
    const session = await getServerSession(authOptions)
    if (session) return redirect("/")
    return <LoginForm />
}
