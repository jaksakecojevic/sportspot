import { signIn } from "next-auth/react"

export default function GoogleButton() {
    function handleLogin() {
        signIn("google", {
            callbackUrl: `${window.location.origin}/nalog`,
        })
    }
    return (
        <button onClick={handleLogin} className="px-4 py-2 flex justify-center items-center gap-4 w-full bg-white rounded-lg border-2 border-gray-200 mt-4 font-semibold hover:bg-gray-200 transition-colors">
            Uloguj se preko Google-a
            <img src="/google.svg" alt="" className="w-6" />
        </button>
    )
}
