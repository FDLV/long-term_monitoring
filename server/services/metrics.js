import QuickChart from "quickchart-js";
import Local_statistics from "../models/local_statistics.js";
import {
  get_local_statistics_service,
  set_local_statistics_service,
  get_local_statistics_by_date_service,
} from "./local_statistics.js";
import config from "../config.js";

export const create_metrics_service = async () => {
  // Получение всех значений углекислого газа
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

  // Получение вчерашних значений углекислого газа
  let dateObj = new Date();
  dateObj = dateObj.toLocaleDateString("en-GB", options);

  const month = Number((dateObj.split('/'))[1]);
  const day = (dateObj.split('/'))[0] - 1;
  const year = Number((dateObj.split('/'))[2]);

  const data = JSON.parse(rapidapi_res);

  const found = data.co2.find((el) => {
    if (Number(el.year) === year && Number(el.month) === month && Number(el.day) === day) return el;
  });

  // Если вчерашних значений углекислого газа пока нет
  if (found === undefined) return;

  // Получение вчерашних значений углекислого газа из локальной БД
  let yesterday_date = new Date();

  yesterday_date = yesterday_date.toLocaleDateString("en-GB", options);

  const month_ye = Number((yesterday_date.split('/'))[1]);
  const day_ye = (yesterday_date.split('/'))[0] - 1;
  const year_ye = Number((yesterday_date.split('/'))[2]);

  let response_check_date;
  try {
    response_check_date = await get_local_statistics_by_date_service(`${year_ye}-${month_ye}-${day_ye}`);
  } catch (error) {
    console.error(error);
    return;
  }

  // Если вчерашние значения углекислого газа уже есть в локальной БД
  if (response_check_date.rows.length !== 0) return

  // Внесение значений углекислого газа в локальную БД
  try {
    const response_set = await set_local_statistics_service(found.trend, `${found.year}-${found.month}-${found.day}`)
  } catch (error) {
    console.error(error);
    return;
  }

  // Получение всех значений углекислого газа из локальной БД
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

  // Генерация картинки на основе данных из локлаьной БД
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

  // Отправка сгенерированного изображения на хостинг
  const img_url = chart.getUrl();

  const blob = await fetch(img_url).then((r) => r.blob());

  const form = new FormData();

  form.append("image", new Blob([blob], { type: "application/octet-stream" }));

  const url_hosting = `https://api.imgbb.com/1/upload?key=${config.imgbbApiKey.toUpperCase()}`
  const options_hosting = {
    method: "POST",
    body: form,
  }

  let imgbb_res;

  try {
    const response = await fetch(url_hosting, options_hosting);
    imgbb_res = await response.text();
  } catch (error) {
    console.error(error);
    return;
  }

  return response_get.rows;
};
