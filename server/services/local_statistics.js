import Local_statistics from "../models/local_statistics.js";

export const set_local_statistics_service = async (concentration, measurement_date) => {
  return await Local_statistics.set_yesterdays_row(concentration, measurement_date);
};

export const get_local_statistics_service = async () => {
  return await Local_statistics.get_all_rows();
};

export const get_local_statistics_by_date_service = async (yesterdays_date) => {
  return await Local_statistics.get_row_by_date(yesterdays_date);
};

export const delete_local_statistics_service = async () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate() - 1;
  let year = dateObj.getUTCFullYear();

  const yesterday_date = year + "-" + month + "-" + day;
  return await Local_statistics.delete_yesterdays_rows(yesterday_date);
};
