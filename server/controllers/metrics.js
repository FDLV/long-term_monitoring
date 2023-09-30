import { create_metrics_service } from "../services/metrics.js";

export const create_metrics = async (req, res) => {
  try {
    const response = await create_metrics_service();

    if (response === undefined) res.status(400).json("Ошибка выполнения запроса");
    else res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};
