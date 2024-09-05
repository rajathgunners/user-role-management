import express, { Express } from "express";
import registerRoutes from "../routes/_register";
import errorHandlerMiddleware from "../middlewares/errorHandlerMiddleware"
require('source-map-support').install();
import configs from "../configs"; // loading configs
import models from "../models";

const app: Express = express();

app.use(express.json()) // to access json body in POST and PUT requests
registerRoutes(app);
app.use(errorHandlerMiddleware)

console.log(configs);

// models.sequelize.sync();

app.listen(configs.PORT, () => {
    console.log(`Example app listening on port ${configs.PORT}`)
})



