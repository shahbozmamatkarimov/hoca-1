import mongoose, { Document, Model } from "mongoose";
export interface IUser extends Document {
    user: mongoose.Types.ObjectId;
    boughtPost: mongoose.Types.ObjectId[];
    likedPost: mongoose.Types.ObjectId[];
    savedStore: mongoose.Types.ObjectId[];
    stores: mongoose.Types.ObjectId[];
    viewedPosts: mongoose.Types.ObjectId[];
}
export interface IUserModel extends Model<IUser> { }