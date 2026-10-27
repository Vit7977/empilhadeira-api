import express from "express";
import cors from "cors";
import routes from "./mapRoutes.js";
import "dotenv/config";
import { startTelemetryCleanupScheduler } from "./src/features/telemetria/scheduler.js";

export const api = express();
const PORT = Number(process.env.PORT || process.env.API_PORT || 3000);

api.use(cors());
api.use(express.json());

routes.forEach((route) => {
  api.use(route.path, route.router);
});

api.listen(PORT, "0.0.0.0", () => {
  console.log(`API: http://localhost:${PORT}`);
  startTelemetryCleanupScheduler();
});

api.get("/health", (_, res) => {
  return res.status(200).json({
    status: "UP",
  });
});
