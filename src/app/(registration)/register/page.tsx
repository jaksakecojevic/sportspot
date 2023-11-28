import { authOptions } from "@/tools/authOptions"
import RegisterForm from "@/components/RegisterForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Register() {
    const session = await getServerSession(authOptions)
    if (session) return redirect("/")
    return <RegisterForm />
}
