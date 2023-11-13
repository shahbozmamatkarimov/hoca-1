import { Router } from "express";
import shopPostContr from "./shopPost.contr.js";
import authMiddleware from "../../middleware/auth.js";
import { productAdminMiddleware } from "../../middleware/admins.js";

const router: Router = Router();

router.get("/", shopPostContr.getAllShopPosts);
router.get("/:id",authMiddleware, shopPostContr.getShopPostById);
router.post("/", authMiddleware, productAdminMiddleware, shopPostContr.createShopPost);
router.put("/:id",authMiddleware, productAdminMiddleware, shopPostContr.updateShopPost);
router.delete("/:id",authMiddleware, productAdminMiddleware, shopPostContr.deleteShopPost);
router.post("/like/:id", authMiddleware, shopPostContr.likePost);

export default router;
