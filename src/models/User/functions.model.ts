import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from './functions.interface';
const userSchema = new Schema<IUser, IUserModel>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, // user maydoni bo'sh bo'lmasligi uchun
    },
    boughtPost: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
    }],
    likedPost: [{
        type: Schema.Types.ObjectId, // Mavjud, "mongoose.Schema.Types.ObjectId" o'rniga "Schema.Types.ObjectId" ishlaydi
        ref: 'Post',
        default: [],
    }],
    savedStore: [{
        type: Schema.Types.ObjectId,
        ref: 'Store',
        default: [],
    }],
    stores: [{
        type: Schema.Types.ObjectId,
        ref: 'Store',
        default: [],
    }],
    viewedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
});

const SavedShopLike = mongoose.model<IUser, IUserModel>('SavedShopLike', userSchema);

export default SavedShopLike;