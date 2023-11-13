import { Request, Response } from "express";
import { IShopPost } from "./shopPost.interface";
import { uploadImg } from "../../utils/uploadImg.js";
import fs from "fs";
import path from "path";
import handleError from "../../utils/catchError.js";
import SavedShopLike from "../User/functions.model.js";
import mongoose from "mongoose";
import storeSchema from "../store/store.schema.js";
import sequelize from "sequelize";
import ShopPost from "./shopPost.model.js";

class ShopPostController {
  // Create a new shop post
  async createShopPost(req: Request, res: Response) {
    try {
      const { price, title, description, storeId } = req.body;
      if (!price || !title || !description || !storeId) {
        res.status(400).json({ error: "Fields are required" });
        return;
      }

      let img = await uploadImg(req, res, title);

      const newShopPost = await ShopPost.create({
        price,
        title,
        description,
        img,
      });

      await storeSchema.update(
        {
          posts: sequelize.fn(
            "array_append",
            sequelize.col("posts"),
            newShopPost.id
          ),
        },
        { where: { id: storeId } }
      );

      return res.status(201).json(newShopPost);
    } catch (error: any) {
      handleError(res, error);
    }
  }
  // Get all shop posts
  async getAllShopPosts(req: Request, res: Response) {
    try {
      const shopPosts = await ShopPost.findAll();
      return res.status(200).json(shopPosts);
    } catch (error: any) {
      handleError(res, error);
    }
  }
  // Get shop posts by id
  async getShopPostById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shopPost = await ShopPost.findByPk(id);
      if (!shopPost) {
        return res
          .status(404)
          .json({ message: "Shop post not found", status: 404 });
      }

      let userId = req.user.idz; // Assuming user ID is available in the request
      if (!shopPost.uniqueViews.includes(userId)) {
        shopPost.view += 1;
        shopPost.uniqueViews.push(userId);
        await shopPost.save();
        const user = await SavedShopLike.findOne({ where: { user: userId } });
        if (user) {
          user.viewedPosts.push(shopPost.id);
          await user.save();
        }
      }
      return res.status(200).json(shopPost);
    } catch (error: any) {
      handleError(res, error);
    }
  }
  // Edit shop post
  async updateShopPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { price, title, description } = req.body;

      let shopPost = await ShopPost.findByPk(id);
      if (!shopPost) {
        res.status(404).json({ error: "Shop post not found" });
        return;
      }

      // If a new file is uploaded
      if (req.files && req.files.file) {
        // Delete the old image if it exists
        if (shopPost.img) {
          const imgPath = path.join(
            process.cwd(),
            "src",
            "public",
            shopPost.img
          );
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        }

        // Upload the new image and save its path
        let img_link = await uploadImg(req, res, title);
        shopPost.img = img_link;
      }

      // Update the shop post data
      shopPost.price = price ? price : shopPost.price;
      shopPost.title = title ? title : shopPost.title;
      shopPost.description = description ? description : shopPost.description;

      await shopPost.save();

      res.status(200).json({
        success: true,
        data: shopPost,
      });
    } catch (error: any) {
      handleError(res, error);
    }
  }
  // Delete a shop post
  async deleteShopPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shopPost = await ShopPost.findByPk(id);
      if (!shopPost) {
        res.status(404).json({ error: "Shop post not found" });
        return;
      } else {
        const imgPath = path.join(process.cwd(), "src", "public", shopPost.img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }

      await ShopPost.destroy({ where: { id } });

      res.status(204).json({ message: "Deleted successfully" });
    } catch (error: any) {
      handleError(res, error);
    }
  }

  async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Assuming user ID is available in the request

      const post = await ShopPost.findByPk(id);
      if (!post) {
        res.status(404).json({ error: "Shop post not found" });
        return;
      }

      const user = await SavedShopLike.findOne({ where: { user: userId } });
      if (user) {
        if (!post.likes.includes(userId)) {
          post.likes.push(userId);
          post.likesCount += 1;
          await post.save();

          user.likedPost.push(post.id);
          await user.save();

          res.status(200).json({ success: true });
        } else {
          user.likedPost = user.likedPost.filter(
            (postId) => postId !== post.id
          );
          await user.save();

          post.likes = post.likes.filter(
            (likedUserId) => likedUserId !== userId
          );
          post.likesCount -= 1;
          await post.save();

          res.status(200).json({ success: true, message: "Post unliked" });
        }
      } else {
        const createHelper = await SavedShopLike.create({ user: userId });
        if (!post.likes.includes(userId)) {
          post.likes.push(userId);
          post.likesCount += 1;
          await post.save();

          createHelper.likedPost.push(post.id);
          await createHelper.save();

          res.status(200).json({ success: true });
        } else {
          createHelper.likedPost = createHelper.likedPost.filter(
            (postId) => postId !== post.id
          );
          await createHelper.save();

          post.likes = post.likes.filter(
            (likedUserId) => likedUserId !== userId
          );
          post.likesCount -= 1;
          await post.save();

          res.status(200).json({ success: true, message: "Post unliked" });
        }
      }
    } catch (error: any) {
      handleError(res, error);
    }
  }
}

export default new ShopPostController();
