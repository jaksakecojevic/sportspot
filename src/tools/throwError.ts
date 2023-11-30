import { Dispatch, SetStateAction } from "react"

export default function throwError(setError: Dispatch<SetStateAction<string>>, message: string, time = 3500) {
    setError(message)
    setTimeout(() => {
        setError("")
    }, time)
}
