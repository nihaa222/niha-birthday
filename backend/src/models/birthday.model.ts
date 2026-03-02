import mongoose from "mongoose"

const birthdayUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 300
        },
        uniqueCode: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 12
        }
    }
)

const Birthday = mongoose.model("Birthday", birthdayUserSchema)

export default Birthday;