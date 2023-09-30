import { useEffect } from "react";
import Head from "./components/Head";
import icon_statistics from "./content/statistics.svg";
import { get_carbon_dioxide_concentration } from "./api/data.js";

const App = () => {
  const head_title = "Client-server application for long-term data analysis";

  const head_image = {
    alt: "statistics",
    src: icon_statistics,
  };

  useEffect(() => {
    // каждые 12 часов:


    



    // получить данные
    // get_carbon_dioxide_concentration();
    // найти текущий день и обработать данные сегодняшнего дня, проверить есть ли дынные сегодняшнего дня, добавить в БД
    // сгенерировать картинку
  }, []);

  return <Head title={head_title} image={head_image} />;
};

export default App;
