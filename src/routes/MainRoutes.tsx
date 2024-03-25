// THIRD-PARTY
import { lazy } from "react";

// PROJECT IMPORTS
import AuthGuard from "utils/route-guard/AuthGuard";
import MainLayout from "layout/mainLayout/MainLayout";
import GuestGuard from "utils/route-guard/GuestGuard";

const ListMedical = lazy(() => import("views/ListMedical"));
const MedicalFacility = lazy(() => import("views/Hospital"));
const MainRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <MainLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: "/",
      element: <ListMedical />,
    },
    {
      path: "/list-medical",
      element: <ListMedical />,
    },
    {
      path: "/hospitals",
      element: <MedicalFacility />,
    },
  ],
};
export default MainRoutes;
