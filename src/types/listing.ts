import { Address, ImageType, Price } from "."
import type Reservation from "./reservation"

export default interface Listing {
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
