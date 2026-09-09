import TelemetriaService from "./service.js";

let intervalId = null;

export const startTelemetryCleanupScheduler = (intervalMs = 60000) => {
  if (intervalId) return intervalId;

  console.log(
    `[Telemetria] Scheduler de limpeza automática iniciado (a cada ${intervalMs / 1000}s, mantendo a última telemetria).`,
  );

  intervalId = setInterval(async () => {
    try {
      await TelemetriaService.deleteExceptLatest();
      console.log(
        `[Telemetria] Limpeza automática executada (mantida a última telemetria registrada).`,
      );
    } catch (error) {
      console.error(
        "[Telemetria] Erro na limpeza automática de telemetria:",
        error.message,
      );
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

