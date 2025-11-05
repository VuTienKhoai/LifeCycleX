// utils/routeHelper.ts
import { ROLE } from "../constants";

export const mapDashboardRoute = (role: string) => {
  switch (role) {
    case ROLE.ADMIN:
      return "/admin/dashboard";
    case ROLE.HOSPITAL:
      return "/hospital/dashboard";
    case ROLE.DOCTOR:
      return "/doctor/dashboard";
    default:
      return "/auth/login";
  }
};
