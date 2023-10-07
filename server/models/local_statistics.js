import pool from "../configs/db.js";

const Local_statistics = {};

// DELETE TODAY'S LOCAL STATISTICS
Local_statistics.set_todays_row = (concentration, measurement_date) => {
  return pool.query("INSERT INTO statistics (concentration, measurement_date) VALUES ($1, $2);", [
    concentration,
    measurement_date,
  ]);
};

// GET ALL LOCAL STATISTICS
Local_statistics.get_all_rows = () => {
  return pool.query("SELECT * FROM statistics;");
};

// GET LOCAL STATISTICS BY DATE
Local_statistics.get_row_by_date = (today_date) => {
  return pool.query("SELECT * FROM statistics WHERE measurement_date = $1;", [today_date]);
};

// DELETE TODAY'S LOCAL STATISTICS
Local_statistics.delete_todays_rows = (today_date) => {
  return pool.query("DELETE FROM statistics WHERE measurement_date = $1;", [today_date]);
};

export default Local_statistics;
