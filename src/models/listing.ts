import { Schema, model, models } from "mongoose"

const priceSchema = new Schema({
    amount: Number,
    amountInRsd: Number,
    currency: String,
})
const addressSchema = new Schema({
    street: String,
    city: String,
})
const imageSchema = new Schema({
    url: String,
    id: String,
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
        searchString: String,
        description: {
            type: String,
            required: true,
        },
        images: [imageSchema],
        pricePerHour: priceSchema,
        address: addressSchema,
        category: {
            type: String,
            default: "all",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "listings" }
)

const listingModel = models?.listingModel || model("listingModel", listingSchema)
export default listingModel
