import { DataTypes } from "sequelize";
import { sequelize } from "../../db/localSequelize.js"; // Import the sequelize instance correctly

const Advertisement = sequelize.define(
  "Advertisement",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Advertisement",
  }
);

export default Advertisement;
