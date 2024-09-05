'use strict';
import { Model } from "sequelize";
import { IRolesAttributes } from "../types/models"

module.exports = (sequelize: any, DataTypes: any) => {
    class Role extends Model<IRolesAttributes> implements IRolesAttributes {

        id!: number;
        roleName!: string;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            // Role.belongsToMany(models.Scope, { through: models.RoleScope, })
            Role.hasOne(models.User);
            Role.hasOne(models.Invite);
        }

        static registerHooks() {
            // define hooks
        }
    }
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'Role',
        timestamps: true,
        paranoid: true,
        tableName: "roles",
    });
    return Role;
};