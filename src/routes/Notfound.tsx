import { lazy } from "react";

const NotFound = lazy(() => import("views/NotFound"));
const NotFoundRoute = {
  path: "*",
  element: <NotFound />,
};
export default NotFoundRoute;
