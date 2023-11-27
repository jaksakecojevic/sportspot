import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { SessionProvider } from "next-auth/react"
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SportSpot",
    description: "SportsSpot is a web application designed to simplify the process of finding and booking sports facilities.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <main className="h-full">{children}</main>
            </body>
        </html>
    )
}
