import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../db/localSequelize.js"; // Import the sequelize instance correctly

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID, // Assuming the ID is a UUID, adjust the data type if needed
      defaultValue: Sequelize.literal("gen_random_uuid()"), // Generate a UUID as the default value
      primaryKey: true, // Make it the primary key
    },
    user: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    comment: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    uniqueViews: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    cat_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "posts",
  }
);

export default Post;
