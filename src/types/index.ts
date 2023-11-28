export interface Listing {
    id?: string
    ownerId?: string
    title: string
    description: string
    images: string[]
    pricePerHour: Price
    address: Address
    reservations?: Reservation[]
    category?: string
}
export interface Reservation {
    id?: string
    startDate: Date
    endDate: Date
    paid: boolean
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
