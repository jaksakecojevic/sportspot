import { Schema, model, models } from "mongoose"

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: String,
        countryCode: String,
        password: String,
        avatarUrl: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "users" }
)

const userModel = models?.userModel || model("userModel", userSchema)
export default userModel
