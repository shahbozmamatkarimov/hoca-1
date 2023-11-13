import mongoose, { model, Schema } from "mongoose";
import validator from "validator";

const storeSchema: any = new Schema({
  storeTitle: {
    type: String,
    required: true,
  },
  storeLogo: {
    type: String,
  },
  review: [
    {
      ref: "Review",
      type: mongoose.Types.ObjectId,
      default: []
    },
  ],
  posts: [
    {
      ref: "ShopPost",
      type: mongoose.Types.ObjectId,
      default: []
    },
  ],
  storeImgs: [
    {
      type: String,
    },
  ],
  storeRating: {
    type: Number,
    default: 0, // Default raqam (masalan, 0) qo'shildi
  },
  phone: {
    type: String,
  },
  saveCount: {
    type: String || Number,
    default: 0,
  },

  location: {
    type: String,
  },
  category: {
    ref: "category",
    type: mongoose.Types.ObjectId,
  },
  savedBy: [{
    ref: "User",
    type: mongoose.Types.ObjectId,
  }],
  comments: [{
    ref: "ShopComment",
    type: mongoose.Types.ObjectId,
    default: []
  }]
});

export default model("Store", storeSchema);
