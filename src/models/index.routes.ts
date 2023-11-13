import express from "express";
const router = express.Router();
import catRouter from "./category/cat.routes.js";
import userRouter from "./User/user.routes.js";
import advertisementRouter from "./Advertisement/advertisement.routes.js";
import storeRouter from "./store/store.routes.js";
import postRouter from "./Posts/posts.routes.js";
import postCategoryRouter from "./PostCategory/postCategory.routes.js";
import ReviewRouter from "./review/review.routes.js";
import commentRouter from "./Comment/Comment.routes.js";
import functionsRouter from "./User/functions.routes.js";
import storePostRouter from "./ShopPost/shopPost.routes.js"
router.use("/test", () => { });
router.use("/category", catRouter);
router.use("/store", storeRouter);
router.use("/postCategory", postCategoryRouter);
router.use("/advertisement", advertisementRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use('/storeposts', storePostRouter)
router.use("/functions", functionsRouter);
router.use("/review", ReviewRouter);
router.use("/comment", commentRouter);
router.use("/advertisement", advertisementRouter);
export default router;
