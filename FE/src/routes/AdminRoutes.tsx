import AdminLayout from "../layout/AdminLayout";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ProfileForm from "../pages/admin/Profile";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "../constants";
import ListHospital from "../pages/admin/management-hospital/ListHospital";
import AddorUpdateHospital from "../pages/admin/management-hospital/AddorUpdateHospital";
import ListNotification from "../pages/admin/management-notification/ListNotification";
import StatisticReport from "../pages/admin/statistic-report/StatisticReport";
import ManagementNews from "../pages/admin/management-news/ManagementNews";

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
        <AdminLayout basePath="admin" />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: "dashboard",
        element: <DashboardAdmin />,
      },
      {
        path: "list-hospital",
        element: <ListHospital />,
      },
      {
        path: "add-hospital",
        element: <AddorUpdateHospital />,
      },
      {
        path: "profile",
        element: <ProfileForm />,
      },
      {
        path: "list-notification",
        element: <ListNotification />,
      },
      {
        path: "list-news",
        element: <ManagementNews />,
      },
      {
        path: "statistics-report",
        element: <StatisticReport />,
      },
    ],
  },
];

export default AdminRoutes;
