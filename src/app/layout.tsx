import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import AuthProvider from "@/components/AuthProvider"
import StyledComponentsRegistry from "@/components/AntdRegistry"
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SportSpot",
    description: "SportsSpot je veb aplikacija dizajnirana da pojednostavi proces pronalaženja i rezervacije sportskih objekata.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <AuthProvider>
                <body className={`${inter.className}`}>
                    <StyledComponentsRegistry>
                        <main className="h-full">{children}</main>
                    </StyledComponentsRegistry>
                </body>
            </AuthProvider>
        </html>
    )
}
