import { Sequelize } from 'sequelize';
import { User } from '../Users/users.schema.js';
import { Post } from '../Posts/posts.schema.js';
export const associateModels = (sequelize: Sequelize) => {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
};
