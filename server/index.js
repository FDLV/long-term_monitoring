import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import local_statistics_routes from "./routes/local_statistics.js";
import metrics_routes from "./routes/metrics.js";
import { create_metrics_service } from "./services/metrics.js";

const app = express();

app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/local-statistics", local_statistics_routes);
app.use("/metrics", metrics_routes);

// Проверка актуальности данных каждые 6 часов
// 21600000
setInterval(create_metrics_service, 21600000);

app.listen(5000, () => console.log("Server has started on port 5000"));
