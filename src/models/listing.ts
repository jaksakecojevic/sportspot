import { Schema, model, models } from "mongoose"

const priceSchema = new Schema({
    amount: Number,
    currency: String,
})
const addressSchema = new Schema({
    street: String,
    city: String,
})

const listingSchema = new Schema(
    {
        ownerId: {
            type: Schema.ObjectId,
            ref: "userModel",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [String],
        pricePerHour: priceSchema,
        address: addressSchema,
        category: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "listings" }
)

const listingModel = models?.listingModel || model("listingModel", listingSchema)
export default listingModel
