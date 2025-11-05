// src/pages/admin/DashboardAdmin.tsx
import React, { useMemo, useState } from "react";
import { Card, Col, Row, Select, Typography } from "antd";
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
import StatisticDashboardAdmin from "./components/StatisticDashboardAdmin";
const { Title } = Typography;

const DashboardAdmin: React.FC = () => {
  const monthlyProductData = [
    { month: "Th1", products: 300 },
    { month: "Th2", products: 450 },
    { month: "Th3", products: 510 },
    { month: "Th4", products: 380 },
    { month: "Th5", products: 620 },
    { month: "Th6", products: 700 },
  ];

  const categoryData = [
    { name: "Thời trang", value: 2000 },
    { name: "Điện tử", value: 1200 },
    { name: "Gia dụng", value: 600 },
    { name: "Khác", value: 521 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [filter, setFilter] = useState<"last6" | "next6">("last6");

  const filteredMonthlyData = useMemo(() => {
    const sorted = [...monthlyProductData]; // sort theo tháng nếu cần
    return filter === "last6" ? sorted.slice(-6) : sorted.slice(0, 6);
  }, [filter, monthlyProductData]);
  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Tổng quan hệ thống</Title>
      <StatisticDashboardAdmin />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title="Biểu đồ doanh thu"
            extra={
              <Select
                value={filter}
                onChange={(v) => setFilter(v)}
                style={{ width: 130 }}
              >
                <Select.Option value="last6">6 tháng trước</Select.Option>
                <Select.Option value="next6">6 tháng tiếp</Select.Option>
              </Select>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredMonthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: any) =>
                    new Intl.NumberFormat("vi-VN").format(value) + " VNĐ"
                  }
                />
                <Bar dataKey="products" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Tỉ lệ lượt khám theo chuyên khoa">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) =>
                    `${value} ca khám`
                  }
                />
                <Legend verticalAlign="bottom" layout="horizontal" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAdmin;
