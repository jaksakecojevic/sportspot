import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ViewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col justify-between">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
