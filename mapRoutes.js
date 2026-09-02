import FuncionarioRouter from "./src/features/funcionario/router.js";
import UsuarioRouter from "./src/features/usuario/router.js";
import EmpilhadeiraRouter from "./src/features/empilhadeira/router.js";
import TelemetriaRouter from "./src/features/telemetria/router.js";

const routes = [
  {
    path: "/api/funcionario",
    router: FuncionarioRouter,
  },
  {
    path: "/api/usuario",
    router: UsuarioRouter,
  },
  {
    path: "/api/empilhadeira",
    router: EmpilhadeiraRouter,
  },
  {
    path: "/api/telemetria",
    router: TelemetriaRouter,
  },
];

export default routes;
