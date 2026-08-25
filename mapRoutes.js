import FuncionarioRouter from "./src/features/funcionario/router.js";
import UsuarioRouter from "./src/features/usuario/router.js";
import EmpilhadeiraRouter from "./src/features/empilhadeira/router.js";

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
];

export default routes;
