import { useEffect, useState } from "react";
import Head from "./components/Head";
import icon_statistics from "./content/statistics.svg";
import { set_metrics } from "./api/metrics.js";
import {
  get_local_statistics,
  set_local_statistics,
  delete_local_statistics,
} from "./api/local_statistics.js";

const App = () => {
  const [statistics, setStatistics] = useState(null);
  const [block_btn, setBlock_btn] = useState(false);

  const head_title = "Client-server application for long-term data analysis";

  const head_image = {
    alt: "statistics",
    src: icon_statistics,
  };

  const get_data = async () => {
    const data = await get_local_statistics();
    if (data === undefined) return;
    setStatistics(data);
  };

  const set_data = async () => {
    setBlock_btn(true);
    const data = await set_metrics();
    if (data === undefined) {
      setBlock_btn(false);
      return;
    }
    setStatistics(data);
    setBlock_btn(false);
  };

  const delete_data = async () => {
    const data = await delete_local_statistics();
    if (data === undefined) return;
    setStatistics(data);
  };

  const set_date = (date) => {
    const new_date = new Date(date);

    var options = { year: "numeric", month: "numeric", day: "numeric" };
    const formated_date = new_date.toLocaleDateString("en-GB", options);

    const date_diveded_by_dots = formated_date.split("/").join(".");

    return date_diveded_by_dots;
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div>
      <Head title={head_title} image={head_image} />
      <div>Добавление данных в таблицу происходит за вчерашний день</div>
      <div> -</div>
      {statistics?.map((el, i) => (
        <div key={i}>
          <span>{el.concentration}</span>
          <span> -- </span>
          <span>{set_date(el.measurement_date)}</span>
        </div>
      ))}
      <button onClick={() => document.location.reload()}>
        Проверить были ли добавлены новые данные
      </button>
      <button disabled={block_btn} onClick={() => set_data()}>
        Занести данные за вчерашний день
      </button>
      <button onClick={() => delete_data()}>Удалить данные за вчерашний день</button>
    </div>
  );
};

export default App;
