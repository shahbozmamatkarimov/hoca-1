import express, { Request, Response } from "express";
import { IAdvertisement, IVideoInfo } from "./advertisement.interface.js";
import handleError from "../../utils/catchError.js";
import { uploadImg } from "../../utils/uploadImg.js";
import fs from "fs";
import path from "path";
import Advertisement from "./advertisement.model.js";
class advertisementController {
  // Create a new advertisement
  public createAdvertisement = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      let { title, description, url }: IVideoInfo = req.body;

      if (!title || !description || !url) {
        res
          .status(400)
          .json({ error: "title, description, va url talab qilinadi" });
        return;
      }

      let img_link = await uploadImg(req, res, title);

      // Using Sequelize to create a new advertisement
      const advertisement = await Advertisement.create({
        title,
        description,
        url,
        img_link,
      });

      res.status(201).send({
        success: true,
        data: advertisement,
      });
    } catch (error: any) {
      handleError(res, error);
    }
  };
  // Get all advertisements
  public gatAllAdvertisements = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Using Sequelize to find all advertisements
      const advertisements = await Advertisement.findAll({
        order: [["id", "DESC"]], // Assuming you have a 'id' field in your model
        limit: 3,
      });

      res.status(200).json(advertisements);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Get advertisement by ID
  public gatAdvertisementById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;

    try {
      // Using Sequelize to find advertisement by primary key
      const advertisement = await Advertisement.findByPk(id);

      if (!advertisement) {
        res.status(404).json({ error: "advertisement not found" });
        return;
      }

      res.status(200).json(advertisement);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Update advertisement by ID
  public updateAdvertisement = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;

      // Find advertisement by primary key
      let advertisement = await Advertisement.findByPk(id);

      if (!advertisement) {
        res.status(404).json({ error: "Reklama topilmadi" });
        return;
      }

      const { title, description, url }: IVideoInfo = req.body;

      // If a new file is uploaded
      if (req.files && req.files.file) {
        // Delete the old image file if it exists
        if (advertisement.img_link) {
          const imgPath = path.join(
            process.cwd(),
            "src",
            "public",
            advertisement.img_link
          );
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        }

        // Upload the new image and save its path
        const img_link: string = await uploadImg(req, res, title);

        // Update advertisement data
        advertisement.title = title || advertisement.title;
        advertisement.description = description || advertisement.description;
        advertisement.url = url || advertisement.url;
        advertisement.img_link = img_link;
      } else {
        // If no new file is uploaded, only update the information
        advertisement.title = title || advertisement.title;
        advertisement.description = description || advertisement.description;
        advertisement.url = url || advertisement.url;
      }

      // Save the updated advertisement
      const updatedAdvertisement = await advertisement.save();

      res.status(200).json({
        success: true,
        data: updatedAdvertisement,
      });
    } catch (error: any) {
      handleError(res, error);
    }
  };

  // Delete advertisement by ID
  public deleteAdvertisement = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Find advertisement by primary key
      const advertisement = await Advertisement.findByPk(id);

      if (!advertisement) {
        res.status(404).json({ error: "Reklama topilmadi" });
        return;
      }

      // Rasimni o'chirish
      if (advertisement) {
        const imgPath = path.join(
          process.cwd(),
          "src",
          "public",
          advertisement.img_link
        );
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
      // Delete the advertisement
      await advertisement.destroy();

      res.status(204).json(); // Respond with a 204 status code (no content, successful deletion)
    } catch (error: any) {
      handleError(res, error);
    }
  };
}

export default new advertisementController();
