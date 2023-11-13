import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import path from "path/posix";
import Store from "./store.schema.js";
import catSchema from "../category/cat.schema.js";
import fs from "fs";
import User from "../User/user.model.js";
import { JWT } from "../../utils/jwt.js";
import { log } from "console";
import SavedShopLike from "../User/functions.model.js";

export default {
  async post(req: Request, res: Response) {
    try {
      let userId = req.user.id;
      // Extract data from the request body
      const { storeTitle, phone, location, categoryId } = req.body;
      console.log('categoryId :', categoryId);

      // Check if a file (storeLogo) was uploaded
      if (!storeTitle || !phone || !location || !categoryId) {
        return res.status(400).json({ message: "Invalid data" });
      }
      if (!req.files || !req.files.storeLogo) {
        return res.status(400).json({ message: "Store logo is required" });
      }
      if (!mongoose.isValidObjectId(categoryId)) {
        return res.status(400).json({ message: "Invalid category" });
      }

      let categoryData = await catSchema.findById(categoryId);

      if (!categoryData) {
        return res.status(400).json({ message: "Invalid category" });
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      // Get the uploaded file (storeLogo)

      const storeLogo: any = req.files.storeLogo;
      const ext = path.extname(storeLogo.name).toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        return res
          .status(400)
          .json({ message: "Only JPEG and PNG image files are allowed" });
      }

      const newStore = new Store({
        storeTitle,
        phone,
        location,
        category: categoryId,
      });

      let uploadPath =
        process.cwd() + "/src/public/storeLogos/" + newStore._id + ext;
      await storeLogo.mv(uploadPath, (error: any) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        }
      });

      newStore.storeLogo = "/storeLogos/" + newStore._id + ext;
      const savedStore = await newStore.save();

      await catSchema.findByIdAndUpdate(categoryId, {
        $push: {
          stores: newStore._id,
        },
      });
      let savedShopLikeData = await SavedShopLike.findOne({ user: userId });
      if (savedShopLikeData) {
        await SavedShopLike.findByIdAndUpdate(userId, {
          $push: {
            stores: newStore._id,
          },
        });
      } else {
        let creatSavedShopLikeData = await SavedShopLike.create({ user: userId });
        creatSavedShopLikeData.stores.push(newStore._id)
        await creatSavedShopLikeData.save()
      }
      const populatedStore = await Store.populate(savedStore, {
        path: "category",
      });
      res.json({
        data: populatedStore,
      });
    } catch (error) {
      console.error("Error creating store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const storeId = req.params.id; // Get the store ID from the request parameters

      // Find the store by ID
      const store = await Store.findById(storeId).populate("category posts review");

      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      res.status(200).json({ data: store }); // Respond with the store data
    } catch (error) {
      console.error("Error getting store by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      // Find all stores in the database
      const stores = await Store.find().populate("category review");

      res.status(200).json({ data: stores }); // Respond with the array of store data
    } catch (error) {
      console.error("Error getting all stores:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async put(req: Request, res: Response) {
    try {
      const { categoryId } = req.body;
      let storeId = req.params.id;

      let newStore = await Store.findById(storeId);
      let dataFields = ["storeTitle", "phone", "location"];

      dataFields.forEach((e: any) => {
        if (req.body[e]) {
          newStore[e] = req.body[e];
        }
      });

      if (categoryId && !mongoose.isValidObjectId(categoryId)) {
        return res.status(400).json({ message: "Invalid category" });
      } else if (categoryId) {
        let categoryData = await catSchema.findById(categoryId);

        if (!categoryData) {
          return res.status(400).json({ message: "Invalid category" });
        }
        newStore.category = categoryId;
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      // Get the uploaded file (storeLogo)

      const storeLogo: any = req.files?.storeLogo;

      if (storeLogo) {
        const ext = path.extname(storeLogo.name).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
          return res
            .status(400)
            .json({ message: "Only JPEG and PNG image files are allowed" });
        }
        allowedExtensions.forEach(async (e: any) => {
          await fs.unlink(
            process.cwd() + "/src/public/storeLogos/" + newStore._id + e,
            (err) => { }
          );
        });

        let uploadPath =
          process.cwd() + "/src/public/storeLogos/" + newStore._id + ext;
        await storeLogo.mv(uploadPath, (error: any) => {
          if (error) {
            console.log(error);
            throw new Error(error);
          }
        });

        newStore.storeLogo = "/storeLogos/" + newStore._id + ext;
      }

      const savedStore = await newStore.save();

      const populatedStore = await Store.populate(savedStore, {
        path: "category",
      });
      res.json({
        data: populatedStore,
      });
    } catch (error) {
      console.error("Error creating store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async del(req: Request, res: Response) {
    try {
      const storeId = req.params.id; // Get the store ID from the request parameters
      const allowedExtensions = [".jpg", ".jpeg", ".png"];

      allowedExtensions.forEach(async (e: any) => {
        await fs.unlink(
          process.cwd() + "/src/public/storeLogos/" + storeId + e,
          (err) => { }
        );
      });
      // Find the store by ID
      const store = await Store.findByIdAndDelete(storeId);

      res.status(200).json({ message: "Store deleted" }); // Respond with the store data
    } catch (error) {
      console.error("Error deleting store by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async save(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const storeId = new mongoose.Types.ObjectId(req.params.id);
      // Find the user's SavedShopLike document or create it if it doesn't exist
      let userSavedShopLike = await SavedShopLike.findOne({ user: userId });

      if (!userSavedShopLike) {
        userSavedShopLike = await SavedShopLike.create({ user: userId });
      }

      const shopStore = await Store.findById(storeId);

      if (!shopStore) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }
      if (userSavedShopLike.stores.includes(storeId)) {
        // User has already saved the store, so unsave it
        const storeIndex = userSavedShopLike.stores.indexOf(storeId);
        userSavedShopLike.stores.splice(storeIndex, 1);

        const userIndex = shopStore.savedBy.indexOf(userId);
        shopStore.savedBy.splice(userIndex, 1);

        shopStore.saveCount -= 1;

        await Promise.all([userSavedShopLike.save(), shopStore.save()]);
        res.status(200).json({ success: true, message: 'Store unsaved' });
      } else {
        // User hasn't saved the store, so save it
        userSavedShopLike.stores.push(storeId);
        shopStore.savedBy.push(userId);
        shopStore.saveCount += 1;

        await Promise.all([userSavedShopLike.save(), shopStore.save()]);
        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error("Error saving/unsaving store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
