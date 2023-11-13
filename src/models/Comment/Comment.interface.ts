import { Document, Types } from "mongoose";

export interface IComment extends Document {
    user: Types.ObjectId | {};
    createdAt: Date;
    content: string;
    postId: Types.ObjectId
}
