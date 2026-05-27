import express from "express";

const app = express(); //Create an express app

//We have to parse the json request we from the users on our website.
app.use(express.json());

//import routes
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)

//post route
app.use("/api/v1/post", postRouter);


//example route: http://localhost:4000/api/v1/users/register

export default app;