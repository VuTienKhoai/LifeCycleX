import { Card, Col, Row, Select, Typography } from "antd";
import {
  LineChart,
  AreaChart,
  BarChart,
  Bar,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import StatisticDashboardHospital from "../components/StatisticDashboardHospital";
import { useState } from "react";

export default function DashboardHospital() {
  const { Title } = Typography;
  const [filter, setFilter] = useState("last12"); // default 12 tháng
  const filteredData = () => {
    if (filter === "last6") return monthlyRevenueData.slice(0, 6);
    if (filter === "next6") return monthlyRevenueData.slice(6, 12);
    return monthlyRevenueData; // default 12 tháng
  };
  // Doanh thu 6 tháng
  const monthlyRevenueData = [
    { month: "Th1", revenue: 30000000 },
    { month: "Th2", revenue: 45000000 },
    { month: "Th3", revenue: 51000000 },
    { month: "Th4", revenue: 38000000 },
    { month: "Th5", revenue: 62000000 },
    { month: "Th6", revenue: 70000000 },
    { month: "Th7", revenue: 68000000 },
    { month: "Th8", revenue: 72000000 },
    { month: "Th9", revenue: 75000000 },
    { month: "Th10", revenue: 80000000 },
    { month: "Th11", revenue: 85000000 },
    { month: "Th12", revenue: 90000000 },
  ];

  // Lượt khám theo chuyên khoa
  const specialistData = [
    { name: "Nhi", value: 200 },
    { name: "Tim mạch", value: 120 },
    { name: "Da liễu", value: 60 },
    { name: "Khác", value: 80 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Tình trạng lịch khám
  const scheduleStatusData = [
    { status: "Hoàn thành", count: 150 },
    { status: "Chờ khám", count: 40 },
    { status: "Hủy", count: 10 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Tổng quan bệnh viện</Title>
      <StatisticDashboardHospital />

      <Row gutter={[24, 24]}>
        {/* Doanh thu theo tháng */}
        <Col xs={24}>
          <Card
            title="Doanh thu 12 tháng (VNĐ)"
            extra={
              <Select
                value={filter}
                onChange={(v) => setFilter(v)}
                style={{ width: 160 }}
              >
                <Select.Option value="last6">6 tháng trước</Select.Option>
                <Select.Option value="next6">6 tháng tiếp</Select.Option>
                <Select.Option value="last12">12 tháng</Select.Option>
              </Select>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData()}>
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${value / 1000000}M`;
                    if (value >= 1000) return `${value / 1000}k`;
                    return value;
                  }}
                />
                <Tooltip
                  formatter={(value: number) => {
                    if (value >= 1000000)
                      return `${(value / 1000000).toFixed(1)} triệu VNĐ`;
                    if (value >= 1000)
                      return `${(value / 1000).toFixed(1)}k VNĐ`;
                    return value + " VNĐ";
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1890ff"
                  fill="#bae7ff"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Tỉ lệ lượt khám theo chuyên khoa */}
        <Col xs={24} md={12}>
          <Card title="Tỉ lệ lượt khám theo chuyên khoa">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specialistData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value} ca`} // hiển thị tên + số lượt
                >
                  {specialistData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} ca khám`} />
                <Legend verticalAlign="bottom" layout="horizontal" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Tình trạng lịch khám */}
        <Col xs={24} md={12}>
          <Card title="Tình trạng lịch khám">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scheduleStatusData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#722ed1" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
