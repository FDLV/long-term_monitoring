import pool from "../configs/db.js";

const Local_statistics = {};

// DELETE YESTERDAY'S LOCAL STATISTICS
Local_statistics.set_yesterdays_row = (concentration, measurement_date) => {
  return pool.query("INSERT INTO statistics (concentration, measurement_date) VALUES ($1, $2);", [
    concentration,
    measurement_date,
  ]);
};

// GET ALL LOCAL STATISTICS
Local_statistics.get_all_rows = () => {
  return pool.query("SELECT * FROM statistics ORDER BY measurement_date;");
};

// GET LOCAL STATISTICS BY DATE
Local_statistics.get_row_by_date = (yesterday_date) => {
  return pool.query("SELECT * FROM statistics WHERE measurement_date = $1;", [yesterday_date]);
};

// DELETE YESTERDAY'S LOCAL STATISTICS
Local_statistics.delete_yesterdays_rows = (yesterday_date) => {
  return pool.query("DELETE FROM statistics WHERE measurement_date = $1;", [yesterday_date]);
};

export default Local_statistics;
