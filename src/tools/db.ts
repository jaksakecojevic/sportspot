import mongoose from "mongoose"

const connection: any = {}

export const connectMongo = async () => {
    if (connection.isConnected) {
        console.log("Cached connection used.")
        return
    }
    console.log("Mongo connected.")

    const db = await mongoose.connect(process.env.MONGO_URL as string)
    connection.isConnected = db.connections[0].readyState
}
