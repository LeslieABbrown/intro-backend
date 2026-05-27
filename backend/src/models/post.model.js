import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 5,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            minLength: 10,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 150,
        }
        
    }, 
    {
        timestamps: true,
    }
)

export const Post = mongoose.model("Post", postSchema);

// 1:49:59