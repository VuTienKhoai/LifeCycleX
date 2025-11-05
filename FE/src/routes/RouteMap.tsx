import AdminRoutes from "./AdminRoutes";
import { ROLE } from "../constants";
import HospitalRoutes from "./HospitalRoutes";
import DoctorRoutes from "./DoctorRoutes";

const RouteMap: Record<string, any[]> = {
  [ROLE.ADMIN]: [...AdminRoutes],
  [ROLE.HOSPITAL]: [...HospitalRoutes],
  [ROLE.DOCTOR]: [...DoctorRoutes],
};

export default RouteMap;
