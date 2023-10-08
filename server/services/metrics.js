import QuickChart from "quickchart-js";
import Local_statistics from "../models/local_statistics.js";
import {
  get_local_statistics_service,
  get_local_statistics_by_date_service,
} from "./local_statistics.js";
import config from "../config.js";

export const create_metrics_service = async () => {
  // получение данных об углекислом газе
  const url = "https://daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com/api/co2-api";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${config.rapidApiKey}`,
      "X-RapidAPI-Host": "daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com",
    },
  };

  let rapidapi_res;

  try {
    const response = await fetch(url, options);
    rapidapi_res = await response.text();
  } catch (error) {
    console.error(error);
    return;
  }

  // Обработка полученных данных (получение вчерашнего значения)
  let dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate() - 1;
  const year = dateObj.getUTCFullYear();

  const data = JSON.parse(rapidapi_res);

  const found = data.co2.find((el) => {
    if (Number(el.year) === year && Number(el.month) === month && Number(el.day) === day) return el;
  });

  // данных за вчерашний день пока нет
  if (found === undefined) return;

  // Внесение значения в БД
  const yesterday_date = new Date();
  const yesterday_date_fix = yesterday_date.setHours(-24, 0, 0, 0);

  let response_check_date;
  try {
    response_check_date = await get_local_statistics_by_date_service(yesterday_date);
  } catch (error) {
    console.error(error);
    return;
  }

  if (response_check_date.rows.length === 0) {
    Local_statistics.set_yesterdays_row(found.trend, `${found.year}-${found.month}-${found.day}`);
  }

  let response_get;
  try {
    response_get = await get_local_statistics_service();
  } catch (error) {
    console.error(error);
    return;
  }

  const concentrations_list = response_get.rows.map((el) => el.concentration);
  const measurement_dates_list = response_get.rows.map((el) => {
    const new_date = new Date(el.measurement_date);

    var options = { year: "numeric", month: "numeric", day: "numeric" };
    const formated_date = new_date.toLocaleDateString("en-GB", options);

    const date_diveded_by_dots = formated_date.split("/").join(".");

    return `'${date_diveded_by_dots}'`;
  });

  // сгенерировать картинку
  const chart = new QuickChart();

  chart.setWidth(500);
  chart.setHeight(300);

  chart.setConfig(`{
    type: 'line',
    data: {
      labels: [${measurement_dates_list}],
      datasets: [
        {
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          data: [${concentrations_list}],
          label: 'Концентрация углекислого газа',
          fill: 'start',
        },
      ],
    },
    options: {
      title: {
        text: 'Изменение концентрации углекислого газа в мире',
        display: true,
      },
      scales: {},
    },
  }`);

  const img_url = chart.getUrl();

  const blob = await fetch(img_url).then((r) => r.blob());

  const form = new FormData();
  form.append("image", new Blob([blob], { type: "application/octet-stream" }));
  const req = await fetch(
    `https://api.imgbb.com/1/upload?key=${config.imgbbApiKey.toUpperCase()}`,
    {
      method: "POST",
      body: form,
    }
  ).catch((err) => {
    console.log(err);
  });

  return response_get.rows;
};
