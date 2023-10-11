import {
  get_local_statistics_service,
  get_local_statistics_by_date_service,
  set_local_statistics_service,
  delete_local_statistics_service,
} from "../services/local_statistics.js";

export const get_local_statistics = async (req, res) => {
  try {
    const response = await get_local_statistics_service();

    if (response === undefined) {
      res.status(400).json("Произошла ошибка во время получения записей из БД");
    } else res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const set_local_statistics = async (req, res) => {
  try {
    const concentration = req.body.concentration;
    const measurement_date = req.body.measurement_date;

    if (concentration === null || concentration === undefined) {
      return res.status(400).json("Отсутствует параметр concentration в body");
    }
    if (measurement_date === null || measurement_date === undefined) {
      return res.status(400).json("Отсутствует параметр measurement_date в body");
    }

    console.log(measurement_date);

    const yesterday_date = new Date();
    const yesterday_date_fix = yesterday_date.setHours(-24, 0, 0, 0);
    const measurement_date_fix = new Date(measurement_date).setHours(0, 0, 0, 0);

    if (yesterday_date_fix !== measurement_date_fix) {
      return res.status(400).json("Параметр measurement_date не является вчерашней датой");
    }

    const response_check_date = await get_local_statistics_by_date_service(yesterday_date);

    let response_create = null;

    if (response_check_date.rows.length === 0) {
      response_create = await set_local_statistics_service(
        req.body.concentration,
        req.body.measurement_date
      );
    }

    const response_get = await get_local_statistics_service();

    if (response_create !== undefined && response_get !== undefined) {
      res.status(200).json(response_get.rows);
    } else res.status(400).json("Произошла ошибка во время добавления новой записи в БД");
  } catch (error) {
    console.log(error);
  }
};

export const delete_local_statistics = async (req, res) => {
  try {
    const response_delete = await delete_local_statistics_service();
    const response_get = await get_local_statistics_service();

    if (response_delete !== undefined && response_get !== undefined) {
      res.status(200).json(response_get.rows);
    } else res.status(400).json("Произошла ошибка во время удаления записи из БД");
  } catch (error) {
    console.log(error);
  }
};
