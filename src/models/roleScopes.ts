'use strict';
import { Model } from "sequelize";
import { IRoleScopesAttributes } from "../types/models"

module.exports = (sequelize: any, DataTypes: any) => {
    class RoleScope extends Model<IRoleScopesAttributes> implements IRoleScopesAttributes {

        roleId!: number;
        scopeId!: string;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            RoleScope.belongsTo(models.Role, { targetKey: "id", foreignKey: "roleId" });
            RoleScope.belongsTo(models.Scope, { targetKey: "id", foreignKey: "scopeId" });
        }

        static registerHooks() {
            // define hooks
        }
    }
    RoleScope.init({
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        scopeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'scopes',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'RoleScope',
        timestamps: true,
        paranoid: true,
        tableName: "roleScopes",
    });
    return RoleScope;
};