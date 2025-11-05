import { memo } from "react";
import DashboardStatistic, {
  type StatisticItem,
} from "../../../components/DashboardStatistic";
import {
  BankOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { queryGetStatisticAdmin } from "../../../api/dashboard/dashboard.query";

function StatisticDashboardAdmin() {
  const { data: dataStatistic, isLoading } = queryGetStatisticAdmin();
  const statisticData: StatisticItem[] = dataStatistic
    ? [
        {
          title: "Người dùng",
          value: dataStatistic?.data.totalAccount,
          prefix: <UserOutlined />,
          color: "#3f8600",
        },
        {
          title: "Bác sĩ",
          value: dataStatistic?.data.totalDoctor,
          prefix: <TeamOutlined />,
          color: "#1890ff",
        },
        {
          title: "Bệnh viện",
          value: dataStatistic?.data.totalHospital,
          prefix: <BankOutlined />,
          color: "#722ed1",
        },
        {
          title: "Chuyên khoa",
          value: dataStatistic?.data.totalSpecialty,
          prefix: <MedicineBoxOutlined />,
          color: "#cf1322",
        },
      ]
    : []; // Nếu chưa có data thì để mảng rỗng

  return <DashboardStatistic data={statisticData} loading={isLoading} />;
}

export default memo(StatisticDashboardAdmin);
