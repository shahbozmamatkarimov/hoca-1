import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../db/localSequelize.js";

const ShopPost = sequelize.define(
  "ShopPost",
  {
    id: {
      type: DataTypes.UUIDV4, // Assuming the ID is a UUID, adjust the data type if needed
      defaultValue: Sequelize.literal("gen_random_uuid()"), // Generate a UUID as the default value
      primaryKey: true, // Make it the primary key
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "shop_posts",
  }
);

export default ShopPost;
