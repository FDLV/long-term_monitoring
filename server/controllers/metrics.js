import { create_metrics_service } from "../services/metrics.js";

export const create_metrics = async (req, res) => {
  try {
    const response = await create_metrics_service();

    if (response === undefined) return res.status(400).json("Ошибка выполнения запроса");
    else return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};
