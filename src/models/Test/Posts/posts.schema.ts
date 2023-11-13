import { Model, DataTypes } from 'sequelize';

export class Post extends Model {
    id!: number;
    title!: string;
    content!: string;
    userId!: number;
}

export const initPostModel = (sequelize: any) => {
    Post.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Post',
    });
};
