import TelemetriaService from "./service.js";

let intervalId = null;

export const startTelemetryCleanupScheduler = (intervalMs = 30000) => {
  if (intervalId) return intervalId;

  console.log(
    `[Telemetria] Scheduler de reset automático iniciado (a cada ${intervalMs / 1000}s).`,
  );

  intervalId = setInterval(async () => {
    try {
      await TelemetriaService.reset();
      console.log(`[Telemetria] Dados de telemetria resetados no banco de dados.`);
    } catch (error) {
      console.error("[Telemetria] Erro ao resetar dados de telemetria:", error.message);
    }
  }, intervalMs);

  return intervalId;
};

export const stopTelemetryCleanupScheduler = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[Telemetria] Scheduler de reset automático parado.");
  }
};

