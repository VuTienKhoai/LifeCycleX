import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "../constants";
import AddSchedule from "../pages/doctor/management-schedules/ScheduleCreate";
import ScheduleTracking from "../pages/doctor/management-schedules/ScheduleTracking";
import DashboardDoctor from "../pages/doctor/dashboard-doctor/DashboardDoctor";
import ProfileForm from "../pages/admin/Profile";
import AddorUpdateMedicalHistory from "../pages/doctor/management-medical-history/AddorUpdateMedicalHistory";
import ListMedicalHistory from "../pages/doctor/management-medical-history/ListMedicalHistory";
const DoctorRoutes = [
  {
    path: "/doctor",
    element: (
      <ProtectedRoute allowedRoles={[ROLE.DOCTOR]}>
        <AdminLayout basePath="doctor" />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardDoctor />,
      },
      {
        path: "dashboard",
        element: <DashboardDoctor />,
      },
      {
        path: "schedule-create",
        element: <AddSchedule />,
      },
      {
        path: "schedule-tracking",
        element: <ScheduleTracking />,
      },
      {
        path: "profile",
        element: <ProfileForm />,
      },
      {
        path: "add-medical-history",
        element: <AddorUpdateMedicalHistory />,
      },
      {
        path: "management-medical-histories",
        element: <ListMedicalHistory />,
      },
    ],
  },
];

export default DoctorRoutes;
