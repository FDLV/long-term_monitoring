import config from "../config.js";

// Получить данные
export const set_metrics = async () => {
  const url = `http://${config.address}/metrics`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  const response = await fetch(url, params);
  if (response.status !== 200) return;
  return response.json();
};
