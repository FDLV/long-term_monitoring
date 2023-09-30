import pool from "../configs/db.js";

const Local_statistics = {};

// GET ALL LOCAL STATISTICS
Local_statistics.get_all_rows = () => {
  return pool.query("SELECT * FROM statistics;");
};

// DELETE TODAY'S LOCAL STATISTICS
Local_statistics.delete_todays_rows = (today_date) => {
  return pool.query("DELETE FROM statistics WHERE measurement_date = $1;", [today_date]);
};

export default Local_statistics;
