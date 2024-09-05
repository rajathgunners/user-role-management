'use strict';
import { Model } from "sequelize";
import { IUsersAttributes } from "../types/models"

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<IUsersAttributes> implements IUsersAttributes {

        id!: number;
        email!: string;
        password!: string;
        roleId!: number;
        inviteId: number;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            User.belongsTo(models.Role);
            User.belongsTo(models.Invite);
        }

        static registerHooks() {
            // define hooks
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inviteId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "invites",
                key: "id"
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        tableName: "users",
    });
    return User;
};