'use strict';
import { Model } from "sequelize";
import { IScopesAttributes } from "../types/models"
// import ScopesHooks from "./hooks/scopes";

module.exports = (sequelize: any, DataTypes: any) => {
    class Scope extends Model<IScopesAttributes> implements IScopesAttributes {

        id!: number;
        scopeName!: string;
        scopeService!: string;
        scopeAction!: string;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            // Scope.belongsToMany(models.Role, { through: models.RoleScope })
        }

        static registerHooks() {
            // define hooks
            // Scope.addHook("beforeValidate", ScopesHooks.beforeValidate)
        }
    }
    Scope.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        scopeName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        scopeService: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scopeAction: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Scope',
        timestamps: true,
        paranoid: true,
        tableName: "scopes",
    });
    return Scope;
};