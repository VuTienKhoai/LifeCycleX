// src/components/dashboard/DashboardStatistic.tsx
import React, { memo } from "react";
import { Row, Col, Card, Statistic, Skeleton } from "antd";

export interface StatisticItem {
  title: string;
  value: number;
  prefix?: React.ReactNode;
  color?: string;
  suffix?: string;
}

interface DashboardStatisticProps {
  data: StatisticItem[];
  loading?: boolean; // thêm prop loading
}

const DashboardStatistic: React.FC<DashboardStatisticProps> = ({
  data,
  loading = false,
}) => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
      {loading
        ? // Nếu loading, hiển thị skeleton
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card>
                  <div
                    style={{
                      height: 63,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      active
                      paragraph={false}
                      title={{ width: "60%" }}
                    />
                  </div>
                </Card>
              </Col>
            ))
        : // Nếu không loading, hiển thị dữ liệu thật
          data.map((item, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card>
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  valueStyle={{ color: item.color || "#000" }}
                />
              </Card>
            </Col>
          ))}
    </Row>
  );
};

export default memo(DashboardStatistic);
