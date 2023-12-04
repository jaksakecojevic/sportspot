export type { default as User } from "./user"
export type { default as Reservation } from "./reservation"
export type { default as Listing } from "./listing"
export interface ImageType {
    url: string
    id: string
}
export interface Price {
    amount: number
    currency: string
    amountInRsd?: number
}
export interface Address {
    street: string
    city: string
}
export type LinkObject = {
    url: string
    children: React.ReactNode
    highlightOnlyIfUrlEqual?: boolean
}
export type Category = "all" | "football" | "basketball" | "tennis" | "pool"
export type ReservationStatus = "open" | "finished" | "cancelled"
