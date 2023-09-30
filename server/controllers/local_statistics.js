import {
  get_local_statistics_service,
  delete_local_statistics_service,
} from "../services/local_statistics.js";

export const get_local_statistics = async (req, res) => {
  try {
    const response = await get_local_statistics_service();

    if (response === undefined) res.status(400).json("Ошибка выполнения запроса");
    else res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const delete_local_statistics = async (req, res) => {
  try {
    const response = await delete_local_statistics_service();

    if (response === undefined) res.status(400).json("Ошибка удаления");
    else res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};
