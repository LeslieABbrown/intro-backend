import { User } from "../models/user.model.js";

//Register controller
const registerUser = async (req, res) => {
    try {
        //destructure the request body
        const {username, email, password}  = req.body;

        //basic validation
        if(!username  || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }
        //Check if the user already exists
        const existingUser = await User.findOne({email: email.toLowerCase()});

        if(existingUser) {
            return res.status(400).json({message: "User already exists!"})
        }

        //Create User
        const user = await User.create({
            username, 
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        })

        //Success message
        res.status(201).json({
            message: "user registered successfully",
            user: { _id: user._id, email: user.email, username: user.username }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error:error.message
        })
    }
}

//Login controller
const loginUser = async (req, res) => {
    try {
        
        //destructure request from the frontend...
        const {email, password} = req.body;

        //basic validation
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        //checking if the user already exists
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        //compare password
        const isMatch = await user.comparePassword(password);
        
        //Prompt the user if their password is does not match
        if(!isMatch) return res.status(400).json({
            message: "Invalid Credentials"
        })

        res.status(200).json({
            message: "User Logged in successfully",

            user: {
                id: user._id, 
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}

//Logout controller
const logoutUser = async (req, res) => {
    try {
        //destructure email from the request body
        const { email }  = req.body;

        //Check if the user exists
        const user = await User.findOne({
            email
        })

        if(!user) return res.status(404).json({
            message: "User does not exist"
        })

        res.status(200).json({
            message: "Logout Successfull"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", 
            error
        })
    }
}

export {
    registerUser, 
    loginUser, 
    logoutUser
}

//1:42:47