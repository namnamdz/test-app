// THIRD-PARTY
import { useRoutes } from "react-router-dom";

// PROJECT IMPORTS
import NotFoundRoute from "./Notfound";
import LoginRoute from "./LoginRoute";
import MainRoutes from "./MainRoutes";

export default function ThemesRoutes() {
  return useRoutes([MainRoutes, LoginRoute, NotFoundRoute]);
}
