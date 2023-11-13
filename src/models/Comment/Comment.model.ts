import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../db/localSequelize.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user: {
        type: DataTypes.STRING, // Assuming 'User' is the model name in Sequelize
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    tableName: "Comment",
  }
);

export default Comment;