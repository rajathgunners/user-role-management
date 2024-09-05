'use strict';
// const fs = require('fs');
import fs from "fs";
import path from "path";
// const path = require('path');
import { Sequelize, DataTypes, Op } from "sequelize";
// const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
import config from "../configs"
const db: any = {};

let sequelize: any = new Sequelize(
    config.POSTGRESQL_DATABASE,
    config.POSTGRESQL_DB_USERNAME,
    config.POSTGRESQL_DB_PASSWORD,
    {
        host: config.POSTGRESQL_DB_HOST,
        dialect: 'postgres'
    }
);


fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1 &&
            file.indexOf('_types.js') === -1
        );
    })
    .forEach((file: string) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
    if (db[modelName].registerHooks) {
        db[modelName].registerHooks();
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

export default db;
