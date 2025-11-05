// // AppRoutes.tsx
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

import { getStateApp } from "../features/slices/app.slice";
import { AuthMainRoutes } from "./AuthRoutes";
import RouteMap from "./RouteMap";
import { ROLE } from "../constants";
import { mapDashboardRoute } from "../untils/routerHelper";

const AppRoutes = () => {
  const { token, role_id } = useSelector(getStateApp);

  const DefaultRoute = [
    {
      path: "/",
      element: token ? (
        <Navigate to={mapDashboardRoute(role_id || ROLE.USER)} replace />
      ) : (
        <Navigate to="/auth/login" replace />
      ),
    },
  ];

  const PublicRoutes = [...AuthMainRoutes];
  const RoleRoutes = role_id ? RouteMap[role_id] || [] : [];
  const routes = token
    ? [...DefaultRoute, ...RoleRoutes]
    : [...DefaultRoute, ...PublicRoutes];

  return useRoutes(routes);
};

export default memo(AppRoutes);
