import dotenv from "dotenv"

if (process.env.NODE_ENV === "DEV") {
    // load from local .env file in development environment and placing it in process.env
    dotenv.config()
} else {
    /*
        TODO: in stage and prod environments, load from some secure system 
        If deploying in AWS system, look into loading from aws ssm parameter store using aws sdk and placing it in process.env
    */
}

let configs = Object.assign(
    {},
    require("./configs.common").default,
    require(`./configs.${process.env.NODE_ENV?.toLowerCase()}`).default
);

export default configs