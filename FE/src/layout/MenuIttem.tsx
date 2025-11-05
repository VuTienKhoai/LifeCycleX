import {
  PieChartOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  ReadOutlined,
  NotificationOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  ScheduleOutlined,
  EyeOutlined,
  FileSearchOutlined,
  PlusSquareOutlined,
  FileAddOutlined,
  EditOutlined,
  SearchOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ROLE } from "../constants";

export const getMenuByRole = (roleId: string | null): MenuProps["items"] => {
  if (!roleId) return [];

  const adminItems: MenuProps["items"] = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Bảng điều khiển" },
    {
      key: "list-hospital",
      icon: <MedicineBoxOutlined />,
      label: "Quản lý bệnh viện",
    },
    {
      key: "list-notification",
      icon: <BellOutlined />, // 🔔 icon thông báo
      label: "Quản lý thông báo",
    },

    {
      key: "statistics-report",
      icon: <PieChartOutlined />,
      label: "Thống kê báo cáo",
    },
  ];

  const hospitalItems: MenuProps["items"] = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Bảng điều khiển" },
    {
      key: "management-doctor",
      icon: <SolutionOutlined />,
      label: "Quản lý bác sĩ",
    },
    {
      key: "management-specialties",
      icon: <MedicineBoxOutlined />,
      label: "Quản lý chuyên khoa",
    },
    {
      key: "management-news",
      icon: <DatabaseOutlined />,
      label: "Quản lý tin tức",
      children: [
        {
          key: "news-create",
          icon: <FileAddOutlined />,
          label: "Thêm tin tức",
        },
        {
          key: "news-search",
          icon: <SearchOutlined />,
          label: "Tra cứu tin tức",
        },
      ],
    },
    {
      key: "list-notification",
      icon: <NotificationOutlined />,
      label: "Quản lý thông báo đẩy",
    },
    {
      key: "management-schedules",
      icon: <CalendarOutlined />,
      label: "Quản lý lịch khám",
    },
    {
      key: "management-medical-histories",
      icon: <FileTextOutlined />,
      label: "Quản lý bệnh án",
    },
    {
      key: "management-data",
      icon: <DatabaseOutlined />,
      label: "Quản lý dữ liệu AI",
    },
    {
      key: "system-config",
      icon: <FileTextOutlined />,
      label: "Cấu hình hệ thống",
      children: [
        {
          key: "schedule-config",
          icon: <CalendarOutlined />,
          label: "Cấu hình lịch khám",
        },
      ],
    },
    {
      key: "statistics-report",
      icon: <PieChartOutlined />,
      label: "Thống kê báo cáo",
    },
  ];

  const doctorItems: MenuProps["items"] = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Bảng điều khiển" },
    {
      key: "management-schedule",
      icon: <ScheduleOutlined />,
      label: "Quản lý lịch khám",
      children: [
        {
          key: "schedule-create",
          icon: <PlusSquareOutlined />,
          label: "Tạo lịch khám",
        },
        {
          key: "schedule-tracking",
          icon: <EyeOutlined />,
          label: "Theo dõi lịch khám",
        },
        // {
        //   key: "schedule-search",
        //   icon: <FileSearchOutlined />,
        //   label: "Tra cứu lịch khám",
        // },
      ],
    },
    {
      key: "management-medical-histories",
      icon: <FileTextOutlined />,
      label: "Quản lý bệnh án",
    },
    {
      key: "statistics-report",
      icon: <PieChartOutlined />,
      label: "Thống kê báo cáo",
    },
  ];

  switch (roleId) {
    case ROLE.ADMIN:
      return adminItems;
    case ROLE.HOSPITAL:
      return hospitalItems;
    case ROLE.DOCTOR:
      return doctorItems;
    default:
      return [];
  }
};
