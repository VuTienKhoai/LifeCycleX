import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "../constants";
import ListDoctor from "../pages/hospital/management-doctor/ListDoctor";
import AddorUpdateDoctor from "../pages/hospital/management-doctor/AddorUpdateDoctor";
import ListSpecialties from "../pages/hospital/management-specialties/ListSpecialties";
import AddorUpdateSpecialties from "../pages/hospital/management-specialties/AddorUpdateSpecialties";
import ListNews from "../pages/hospital/management-news/ListNews";
import ScheduleConfig from "../pages/system-config/ScheduleConfig";
import AddOrUpdateNews from "../pages/doctor/management-news/AddOrUpdateNews";
import DashboardHospital from "../pages/hospital/dashboard-hospital/DashboardHospital";
import ProfileHospital from "../pages/hospital/ProfileHospital";
import ListMedicalHistory from "../pages/doctor/management-medical-history/ListMedicalHistory";
import ListNotification from "../pages/admin/management-notification/ListNotification";

const HospitalRoutes = [
  {
    path: "/hospital",
    element: (
      <ProtectedRoute allowedRoles={[ROLE.HOSPITAL]}>
        <AdminLayout basePath="hospital" />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHospital />,
      },
      {
        path: "dashboard",
        element: <DashboardHospital />,
      },
      {
        path: "management-doctor",
        element: <ListDoctor />,
      },

      {
        path: "add-doctor",
        element: <AddorUpdateDoctor />,
      },
      {
        path: "management-specialties",
        element: <ListSpecialties />,
      },
      {
        path: "add-specialties",
        element: <AddorUpdateSpecialties />,
      },
      {
        path: "management-news",
        element: <ListNews />,
      },
      ,
      {
        path: "schedule-config",
        element: <ScheduleConfig />,
      },
      {
        path: "news-create",
        element: <AddOrUpdateNews />,
      },
      {
        path: "profile",
        element: <ProfileHospital />,
      },
      {
        path: "management-medical-histories",
        element: <ListMedicalHistory />,
      },
      {
        path: "list-notification",
        element: <ListNotification />,
      },
    ],
  },
];

export default HospitalRoutes;
