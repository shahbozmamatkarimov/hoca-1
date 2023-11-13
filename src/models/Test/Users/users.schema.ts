import { Model, DataTypes } from 'sequelize';

export class User extends Model {
    id!: number;
    name!: string;
    email!: string;
}

export const initUserModel = (sequelize: any) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'User',
    });
};
