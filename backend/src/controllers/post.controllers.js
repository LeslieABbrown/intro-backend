import { Post } from "../models/post.model.js";

//Post controller
const createPost = async (req, res) => {
    try {
        //collect data from the req body
        const {name, description, age} = req.body;

        //validation
        if(!name || !description || !age ) return res.status(400).json({
            message: "All fields are required"
        })

        //create the post.
        const post = await Post.create({
            name, 
            description,
            age
        })
        
        //return the sucess message..
        res.status(200).json({
            message: "Post Created successfully",

            post: {
                name: post.name,
                description: post.description,
                age: age,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", 
            error: error.message
        })
    }
}

export {
    createPost
}