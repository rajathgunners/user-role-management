'use strict';
import { Model } from "sequelize";
import { IInvitesAttributes } from "../types/models"

module.exports = (sequelize: any, DataTypes: any) => {
    class Invite extends Model<IInvitesAttributes> implements IInvitesAttributes {

        id!: number;
        inviteeEmail!: string;
        token!: string;
        inviteeRoleId!: number;
        inviterId: number;

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
            Invite.belongsTo(models.Role, { targetKey: "id", foreignKey: "inviteeRoleId" });
            Invite.belongsTo(models.User, { targetKey: "id", foreignKey: "inviterId" });
            Invite.hasOne(models.User);
        }

        static registerHooks() {
            // define hooks
        }
    }
    Invite.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        inviteeEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // invite_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        inviteeRoleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "id"
            }
        },
        inviterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'Invite',
        timestamps: true,
        paranoid: true,
        tableName: "invites",
    });
    return Invite;
};