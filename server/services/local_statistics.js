import Local_statistics from "../models/local_statistics.js";

export const get_local_statistics_service = async () => {
  return await Local_statistics.get_all_rows();
};

export const delete_local_statistics_service = async () => {
  // const today_date = Date.now();

  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  
  const today_date = year + "-" + month + "-" + day;
  return await Local_statistics.delete_todays_rows(today_date);
};
