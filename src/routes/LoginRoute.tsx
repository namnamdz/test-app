// THIRD-PARTY
//PROJECT-IMPORTS
import MinimalLayout from "layout/minimalLayout";
import { lazy } from "react";
import GuestGuard from "utils/route-guard/GuestGuard";

const Login = lazy(() => import("views/Login"));
const LoginRoute = {
  path: "/",
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
};
export default LoginRoute;
