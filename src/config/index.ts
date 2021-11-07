import * as dotenv from "dotenv";
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || "development";
if (NODE_ENV === "production")
    dotenv.config({ path: `${__dirname}/../../.env.prod` });
else if (NODE_ENV === "development")
    dotenv.config({ path: `${__dirname}/../../.env.dev` });
else if (NODE_ENV === "test")
    dotenv.config({ path: `${__dirname}/../../.env.test` });

const env = process.env;

type DataBaseConfig = {
    username: string;
    password: string;
    database: string;
    host: string;
    [key: string]: string;
};

const sequelizeConfig: DataBaseConfig = {
    username: env.MYSQL_USERNAME!,
    password: env.MYSQL_PASSWORD!,
    database: env.MYSQL_DATABASE!,
    host: env.MYSQL_HOST!,
    dialect: env.MYSQL_DIALECT!,
};

export default {
    NODE_ENV: NODE_ENV,
    PORT: Number(env.PORT),
    COOKIE_SECRET: env.COOKIE_SECRET,
    sequelizeConfig,
};
