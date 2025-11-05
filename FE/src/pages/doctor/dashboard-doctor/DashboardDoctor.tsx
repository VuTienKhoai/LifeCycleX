// src/pages/doctor/DashboardDoctor.tsx
import React, { useState } from "react";
import { Card, Col, Row, Typography, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import StatisticDashboardDoctor from "../components/StatisticDashboardDoctor";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { StatisticItem } from "../../../components/DashboardStatistic";

const { Title } = Typography;

const DashboardDoctor: React.FC = () => {
  // Demo dữ liệu thống kê
  const statisticData: StatisticItem[] = [
    {
      title: "Tổng lịch khám",
      value: 120,
      prefix: <CalendarOutlined />,
      color: "#1890ff",
    },
    {
      title: "Hoàn thành",
      value: 85,
      prefix: <CheckCircleOutlined />,
      color: "#3f8600",
    },
    {
      title: "Chờ khám",
      value: 25,
      prefix: <ClockCircleOutlined />,
      color: "#faad14",
    },
    {
      title: "Bệnh nhân mới",
      value: 40,
      prefix: <UserAddOutlined />,
      color: "#722ed1",
    },
  ];

  // Demo dữ liệu BarChart theo khung giờ
  const [timeFilter, setTimeFilter] = useState("thisMonth");
  const timeSlotData = [
    { time: "08-09h", count: 5 },
    { time: "09-10h", count: 12 },
    { time: "10-11h", count: 18 },
    { time: "11-12h", count: 8 },
    { time: "13-14h", count: 15 },
    { time: "14-15h", count: 20 },
  ];

  // Demo PieChart tình trạng lịch khám
  const scheduleStatusData = [
    { name: "Hoàn thành", value: 85 },
    { name: "Chờ", value: 25 },
    { name: "Hủy", value: 10 },
  ];
  const COLORS = ["#3f8600", "#faad14", "#cf1322"];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Tổng quan lịch khám</Title>

      {/* Statistic */}
      <StatisticDashboardDoctor />

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* Biểu đồ phân bố bệnh nhân theo khung giờ */}
        <Col xs={24}>
          <Card
            title="Lượt bệnh nhân theo khung giờ"
            extra={
              <Select
                value={timeFilter}
                onChange={(v) => setTimeFilter(v)}
                style={{ width: 180 }}
              >
                <Select.Option value="thisMonth">Tháng này</Select.Option>
                <Select.Option value="lastMonth">Tháng trước</Select.Option>
              </Select>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={timeSlotData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} bệnh nhân`} />
                <Bar dataKey="count" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* PieChart tình trạng lịch khám */}
        <Col xs={24} md={12}>
          <Card title="Tỉ lệ trạng thái lịch khám">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scheduleStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {scheduleStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} lịch`} />
                <Legend verticalAlign="bottom" layout="horizontal" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* PieChart bệnh nhân mới theo chuyên khoa (optional) */}
        <Col xs={24} md={12}>
          <Card title="Bệnh nhân mới theo chuyên khoa">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Nhi", value: 20 },
                    { name: "Tim mạch", value: 12 },
                    { name: "Da liễu", value: 8 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {["#0088FE", "#00C49F", "#FFBB28"].map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} bệnh nhân`} />
                <Legend verticalAlign="bottom" layout="horizontal" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardDoctor;
