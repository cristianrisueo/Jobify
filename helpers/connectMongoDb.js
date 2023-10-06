import mongoose from "mongoose"

export const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_API, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const url = `${connect.connection.host}:${connect.connection.port}`
    console.log(`Connected to MongoDB at: ${url}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
