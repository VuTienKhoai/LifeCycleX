import { memo } from "react";
import DashboardStatistic, {
  type StatisticItem,
} from "../../../components/DashboardStatistic";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { queryGetStatisticDoctor } from "../../../api/dashboard/dashboard.query";

function StatisticDashboardDoctor() {
  const { data: dataStatistic, isLoading } = queryGetStatisticDoctor();
  const statisticData: StatisticItem[] = dataStatistic
    ? [
        {
          title: "Hoàn thành",
          value: dataStatistic?.data.totalAccount,
          prefix: <CheckCircleOutlined />,
          color: "#3f8600",
        },
        {
          title: "Chờ khám",
          value: dataStatistic?.data.totalDoctor,
          prefix: <ClockCircleOutlined />,
          color: "#1890ff",
        },
        {
          title: "Tổng số",
          value: dataStatistic?.data.totalHospital,
          prefix: <BarChartOutlined />,
          color: "#722ed1",
        },
        {
          title: "Doanh thu",
          value: dataStatistic?.data.totalSpecialty,
          prefix: <RiseOutlined />,
          color: "#cf1322",
        },
      ]
    : []; // Nếu chưa có data thì để mảng rỗng

  return <DashboardStatistic data={statisticData} loading={isLoading} />;
}

export default memo(StatisticDashboardDoctor);
