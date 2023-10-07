import Local_statistics from "../models/local_statistics.js";

export const create_metrics_service = async () => {
  const get_carbon_dioxide_concentration = async () => {
    const url = "https://daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com/api/co2-api";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      // return нужен
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  // запрос на данные
  // найти текущий день и обработать данные сегодняшнего дня, проверить есть ли дынные сегодняшнего дня, добавить в БД
  // сгенерировать картинку
};
