import Head from "./components/Head";
import icon_statistics from "./content/statistics.svg";

const App = () => {
  const head_title = "Client-server application for long-term data analysis";

  const head_image = {
    alt: "statistics",
    src: icon_statistics,
  };

  return <Head title={head_title} image={head_image} />;
};

export default App;
