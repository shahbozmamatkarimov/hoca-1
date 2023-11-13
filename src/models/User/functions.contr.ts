import express, { Request, Response } from "express";
import SavedShopLike from "./functions.model.js";
import handleError from "../../utils/catchError.js";
class UserController {
    public getLiked = async (req: Request, res: Response): Promise<void> => {
        try {
            let id = req.user.id;
            const user = await SavedShopLike.findOne({ user: id }).populate("likedPost");
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).send(
                {
                    succsess: true,
                    data: user
                }
            );
        } catch (error: any) {
            handleError(res, error)
        }
    };
    public getBought = async (req: Request, res: Response): Promise<void> => {
        try {
            let id = req.user.id;
            const user = await SavedShopLike.findOne({ user: id }).populate("boughtPost");
            if (!user) {
                res.status(404).json({ error: 'not found' });
                return;
            }
            res.status(200).send(
                {
                    succsess: true,
                    data: user
                }
            );
        } catch (error: any) {
            handleError(res, error)
        }
    };
    public getSavedStore = async (req: Request, res: Response): Promise<void> => {
        try {
            let id = req.user.id;
            const user = await SavedShopLike.findOne({ user: id }).populate("savedStore");
            if (!user) {
                res.status(404).json({ error: 'not found' });
                return;
            }
            res.status(200).send(
                {
                    succsess: true,
                    data: user
                }
            );
        } catch (error: any) {
            handleError(res, error)
        }
    };
    public getStores = async (req: Request, res: Response): Promise<void> => {
        try {
            let id = req.user.id;
            const user = await SavedShopLike.findOne({ user: id }).populate("stores");
            if (!user) {
                res.status(404).json({ error: 'not found' });
                return;
            }
            res.status(200).send(
                {
                    succsess: true,
                    data: user
                }
            );
        } catch (error: any) {
            handleError(res, error)
        }
    };
    public getViewedPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            let id = req.user.id;
            const user = await SavedShopLike.findOne({ user: id }).populate("viewedPosts");
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).send(
                {
                    succsess: true,
                    data: user
                }
            );
        } catch (error: any) {
            handleError(res, error)
        }
    };
}
export default new UserController();
