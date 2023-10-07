import Local_statistics from "../models/local_statistics.js";

export const set_local_statistics_service = async (concentration, measurement_date) => {
  return await Local_statistics.set_todays_row(concentration, measurement_date);
};

export const get_local_statistics_service = async () => {
  return await Local_statistics.get_all_rows();
};

export const get_local_statistics_by_date_service = async (todays_date) => {
  return await Local_statistics.get_row_by_date(todays_date);
};

export const delete_local_statistics_service = async () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const today_date = year + "-" + month + "-" + day;
  return await Local_statistics.delete_todays_rows(today_date);
};
