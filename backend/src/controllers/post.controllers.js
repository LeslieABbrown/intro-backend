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
        res.status(201).json({
            message: "Post Created successfully", post
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", 
            error: error.message
        })
    }
}

//Display all posts
const getPost = async (req, res) => {
    try {
        //fetch all posts
        const posts = await Post.find();
        //response
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        })
    }
}

//Update post
const updatePost = async (req, res) => {
    try {
        
        //Basic Validation to make sure the body is not empty

        
        //{name: x, description: y, age: z} -> [name, description, age]
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            })
        }

        //Find and update the post
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post updated successfully", post
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

//Delete Post
const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);

        //check if the post exists
        if(!deleted) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post Deleted successfully!"
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}


export {
    createPost,
    getPost,
    updatePost,
    deletePost
}

//1:54:53