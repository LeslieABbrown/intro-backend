import { Router } from "express";
import { createPost, deletePost, getPost, updatePost } from "../controllers/post.controllers.js";

const router = Router();

//Create the /post/new route
router.route('/new').post(createPost);

//Get posts
router.route('/getPosts').get(getPost);

//Update posts
router.route('/update/:id').patch(updatePost)

//Delete POsts
router.route("/delete/:id").delete(deletePost)


export default router;