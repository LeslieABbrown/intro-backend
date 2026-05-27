import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";

const router = Router();

//Create the /post/new route
router.route('/new').post(createPost);


export default router;