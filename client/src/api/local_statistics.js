import config from "../config.js";

// Получить данные
export const get_local_statistics = async () => {
  const url = `http://${config.address}/local-statistics`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  const response = await fetch(url, params);
  return response.json();
};

// Записать данные сегодняшнего дня
export const set_local_statistics = async (body) => {
  const url = `http://${config.address}/local-statistics`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: body,
  };

  const response = await fetch(url, params);
  return response.json();
};

// Удалить данные сегодняшнего дня
export const delete_local_statistics = async () => {
  const url = `http://${config.address}/local-statistics`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  const response = await fetch(url, params);
  return response.json();
};
