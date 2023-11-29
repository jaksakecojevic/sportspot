export interface ImageType {
    url: string
    id: string
}
export interface Listing {
    _id?: string
    id?: string
    ownerId?: string
    title: string
    description: string
    images: ImageType[]
    pricePerHour: Price
    address: Address
    reservations?: Reservation[]
    category?: string
}
export interface Reservation {
    _id?: string
    id?: string
    ownerId?: string
    listingId?: string
    clientInfo: {
        firstName: string
        lastName: string
        phoneNumber?: string
        email?: string
    }
    startDate: Date
    endDate: Date
}
export interface Price {
    amount: number
    currency: string
}
export interface Address {
    street: string
    city: string
}
export interface User {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt: string
}
export type Category = "all" | "football" | "basketball" | "tennis" | "pool"
