import { Request, Response } from "express";
import { uploadImg } from "../../utils/uploadImg.js";
import handleError from "../../utils/catchError.js";
import path from "path";
import fs from "fs";
import postCategorySchema from "../PostCategory/postCategory.schema.js";
import SavedShopLike from "../User/functions.model.js";
import Post from "./posts.model.js";

class PostController {
  // Create a new post
  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, cat_id } = req.body;

      const img = await uploadImg(req, res, title);

      const newPost = await Post.create({
        user: req.user.id,
        title,
        img,
        cat_id,
      });

      let postCategory = await postCategorySchema.findByPk(cat_id);

      if (postCategory) {
        postCategory.posts.push(newPost.id);
        await postCategory.save();
      }

      res.status(201).json(newPost);
    } catch (error: any) {
      handleError(res, error);
    }
  };
  // Get all posts
  public getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await Post.findAll({ include: "comment" });
      res.status(200).json(posts);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Get post by ID
  public getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id, { include: "comment" });
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      let userId = req.user.id; // Assuming user ID is available in the request
      if (!post.uniqueViews.includes(userId)) {
        post.view += 1;
        post.uniqueViews.push(userId);
        
        await post.save();
        const helper = await SavedShopLike.findOne({ where: { user: userId } });
        if (helper) {
          helper.viewedPosts.push(post.id);
          await helper.save();
        } else {
          let createHelper = await SavedShopLike.create({ user: userId });
          createHelper.viewedPosts.push(post.id);
          await createHelper.save();
        }
      }

      res.status(200).json(post);
    } catch (error: any) {
      handleError(res, error);
    }
  };
  // Update post by ID
  public updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Get post data
      let post = await Post.findByPk(id);

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      // Get new data
      const { title } = req.body;
      if (post.user === userId) {
        // If a new file is uploaded
        if (req.files && req.files.file) {
          // Delete the old image
          if (post.img) {
            const imgPath = path.join(process.cwd(), "src", "public", post.img);
            if (fs.existsSync(imgPath)) {
              fs.unlinkSync(imgPath);
            }
          }
          // Upload the new image and save its path
          let img_link = await uploadImg(req, res, title);
          // Update post data
          post.title = title ? title : post.title;
          post.img = img_link;
        } else {
          // If no file is uploaded, only update the data
          post.title = title ? title : post.title;
        }
        // Save the updated post
        const updatedPost = await post.save();
        res.status(200).json({
          success: true,
          data: updatedPost,
        });
      } else {
        res
          .status(403)
          .json({ error: "You don't have permission to update this post" });
      }
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Delete post by ID
  public deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Get post data
      const post = await Post.findByPk(id);

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      // Delete the image (if it exists)
      // Check if the current user is the creator of the post
      if (post.user === userId) {
        // Delete the image (if it exists)
        if (post.img) {
          const imgPath = path.join(process.cwd(), "src", "public", post.img);
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        }

        // Delete the post
        await Post.destroy({ where: { id } });

        res.status(204).json(); // Respond with 204 status code (no content, post deleted)
      } else {
        res
          .status(403)
          .json({ error: "You don't have permission to delete this post" });
      }
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Like a post
  public likePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Assuming user ID is available in the request
      const post = await Post.findByPk(id);

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      const data = await SavedShopLike.findOne({ where: { user: userId } });

      if (data) {
        if (!post.likes.includes(userId)) {
          // Add the user ID to post likes
          await post.addLike(userId);
          post.likesCount += 1;
          await post.save();

          // Add the liked post to the user's likedPosts
          await data.addLikedPost(post);
          await data.save();

          res.status(200).json({ success: true });
        } else {
          // Remove the user ID from post likes
          await post.removeLike(userId);
          post.likesCount -= 1;
          await post.save();

          // Remove the liked post from the user's likedPosts
          await data.removeLikedPost(post);
          await data.save();

          res.status(200).json({ success: true, message: "Post unliked" });
        }
      } else {
        // If the user doesn't have a SavedShopLike document, create one
        const createHelper = await SavedShopLike.create({ user: userId });

        if (!post.likes.includes(userId)) {
          await post.addLike(userId);
          post.likesCount += 1;
          await post.save();

          // Add the liked post to the user's likedPosts
          await createHelper.addLikedPost(post);
          await createHelper.save();

          res.status(200).json({ success: true });
        } else {
          // Remove the user ID from post likes
          await post.removeLike(userId);
          post.likesCount -= 1;
          await post.save();

          // Remove the liked post from the user's likedPosts
          await createHelper.removeLikedPost(post);
          await createHelper.save();

          res.status(200).json({ success: true, message: "Post unliked" });
        }
      }
    } catch (error: any) {
      handleError(res, error);
    }
  };
}

export default new PostController();
