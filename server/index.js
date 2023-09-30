import express, { json } from "express";
import cors from "cors";

import local_statistics_routes from "./routes/local_statistics.js";
import metrics_routes from "./routes/metrics.js";
// import { create_metrics } from "../controllers/metrics.js";
// цикл вызова create_metrics

const app = express();

app.use(cors());
app.use(json());

app.use("/local-statistics", local_statistics_routes);
// app.use("/metrics", metrics_routes);

app.listen(5000, () => console.log("Server has started on port 5000"));
