import FuncionarioRouter from "./src/features/funcionario/router.js";
import UsuarioRouter from "./src/features/usuario/router.js";

const routes = [
  {
    path: "/api/funcionario",
    router: FuncionarioRouter,
  },
  {
    path: "/api/usuario",
    router: UsuarioRouter,
  },
];

export default routes;
