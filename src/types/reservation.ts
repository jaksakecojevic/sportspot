import { ReservationStatus } from "."

export default interface Reservation {
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
    status: ReservationStatus
    createdAt?: string
}
