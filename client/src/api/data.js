// import { config } from "../config/address";

// // Получить данные
// export const auth_user = async (body) => {
//   const url = `http://${config.address}`;
//   const params = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   };

//   const response = await fetch(url, params);
//   return response;
// };

export const get_carbon_dioxide_concentration = async () => {
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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
