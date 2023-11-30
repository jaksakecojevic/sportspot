import { Schema, model, models } from "mongoose"

const clientInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
})
const reservationSchema = new Schema(
    {
        ownerId: {
            type: Schema.ObjectId,
            ref: "userModel",
            required: false,
        },
        listingId: {
            type: Schema.ObjectId,
            ref: "listingModel",
            required: true,
        },
        clientInfo: clientInfoSchema,
        startDate: Date,
        endDate: Date,
        status: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "reservations" }
)

const reservationModel = models?.reservationModel || model("reservationModel", reservationSchema)
export default reservationModel
