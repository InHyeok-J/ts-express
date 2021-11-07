import { Sequelize } from "sequelize";
import env from "../config";

const sequelize = new Sequelize(
    env.sequelizeConfig.database!,
    env.sequelizeConfig.username!,
    env.sequelizeConfig.password!,
    env.sequelizeConfig
);

export { sequelize };
export default Sequelize;
