import config from "../config.js";
import pkg from "pg";

const { Pool } = pkg;

export default new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
});
