
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import birthdayRoutes from "./routes/birthday.route"
import cors from "cors"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT
console.log(PORT)

const connectDB = async () => {
    try{
        if (!process.env.MONGO){
            throw new Error("MONGO URI not defined")
        }
        await mongoose.connect(process.env.MONGO);
        console.log("connected")
    }catch (error){
        console.error(error)

    }
}

connectDB()

app.use("/birthdayData", birthdayRoutes)

app.listen(PORT, ()=> {
    console.log("Server running on port PORT")
})
