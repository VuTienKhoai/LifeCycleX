import React, { memo } from "react";
import { queryGetStatisticHospital } from "../../../api/dashboard/dashboard.query";
import type { StatisticItem } from "../../../components/DashboardStatistic";
import {
  TeamOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import DashboardStatistic from "../../../components/DashboardStatistic";

function StatisticDashboardHospital() {
  const { data: dataStatistic, isLoading } = queryGetStatisticHospital();
  const statisticData: StatisticItem[] = dataStatistic
    ? [
        {
          title: "Bác sĩ",
          value: dataStatistic?.data.totalDoctor,
          prefix: <TeamOutlined />,
          color: "#3f8600",
        },
        {
          title: "Chuyên khoa",
          value: dataStatistic?.data.totalSpecialty,
          prefix: <MedicineBoxOutlined />,
          color: "#1890ff",
        },
        {
          title: "Lịch khám",
          value: dataStatistic?.data.totalSchedule,
          prefix: <CalendarOutlined />,
          color: "#722ed1",
        },
        {
          title: "Doanh thu",
          value: dataStatistic?.data.totalRevenue,
          prefix: <DollarCircleOutlined />,
          color: "#cf1322",
        },
      ]
    : []; // Nếu chưa có data thì để mảng rỗng

  return <DashboardStatistic data={statisticData} loading={isLoading} />;
}

export default memo(StatisticDashboardHospital);
