import { useEffect, useState } from "react";
import Head from "./components/Head";
import icon_statistics from "./content/statistics.svg";
import { get_carbon_dioxide_concentration } from "./api/metrics.js";
import { get_local_statistics, set_local_statistics, delete_local_statistics } from "./api/local_statistics.js";

const App = () => {
  const [statistics, setStatistics] = useState(null);

  const head_title = "Client-server application for long-term data analysis";

  const head_image = {
    alt: "statistics",
    src: icon_statistics,
  };

  const body = { concentration: 400, measurement_date: '2023-10-07' }

  const get_data = async () => {
    const data = await get_local_statistics();
    setStatistics(data);
  };

  const set_data = async () => {
    const data = await set_local_statistics(JSON.stringify(body));
    if (typeof(data) === 'string') return
    setStatistics(data);
  }

  const delete_data = async () => {
    const data = await delete_local_statistics();
    setStatistics(data);
  }

  useEffect(() => {
    get_data();

    // получить данные
    // get_carbon_dioxide_concentration();
    // найти текущий день и обработать данные сегодняшнего дня, проверить есть ли дынные сегодняшнего дня, добавить в БД
    // сгенерировать картинку
  }, []);


  return (
    <div>
      <Head title={head_title} image={head_image} />
      {statistics?.map((el, i) => (
        <div key={i}>
          <span>{el.concentration}</span>
          <span> -- </span>
          <span>{el.measurement_date}</span>
        </div>
      ))}
      <button onClick={() => set_data()}>Занести данные сегодняшнего дня</button>
      <button onClick={() => delete_data()}>Удалить данные сегодняшнего дня</button>
    </div>
  );
};

export default App;
