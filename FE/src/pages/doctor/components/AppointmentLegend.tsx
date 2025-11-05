import { Card, Flex, Tag, Typography } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AppointmentStatus,
  type AppointmentStatusType,
} from "../../../constants";
import {
  AppointmentStatusColors,
  AppointmentStatusLabels,
} from "../../../constants/AppointmentStatus";

const { Text } = Typography;

const AppointmentStatusIcons: Record<AppointmentStatusType, React.ReactNode> = {
  [AppointmentStatus.AVAILABLE]: <CalendarOutlined />,
  [AppointmentStatus.BOOKED]: <UserOutlined />,
  [AppointmentStatus.INPROGRESS]: <ClockCircleOutlined />,
  [AppointmentStatus.COMPLETED]: <CheckCircleOutlined />,
  [AppointmentStatus.CANCELED]: <CloseCircleOutlined />,
};

const statuses: { key: AppointmentStatusType; label: string }[] = [
  { key: AppointmentStatus.AVAILABLE, label: "Trống" },
  { key: AppointmentStatus.BOOKED, label: "Đã đặt" },
  { key: AppointmentStatus.INPROGRESS, label: "Sẵn sàng" },
  { key: AppointmentStatus.COMPLETED, label: "Hoàn thành" },
  { key: AppointmentStatus.CANCELED, label: "Đã hủy" },
];

export default function AppointmentLegend() {
  return (
    <Card
      size="small"
      bordered={false}
      style={{
        width: 300,
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      }}
    >
      <Flex vertical gap={12}>
        {statuses.map((status) => (
          <Flex
            key={status?.key}
            align="center"
            gap={12}
            style={{ padding: "4px 6px", borderRadius: 6 }}
          >
            <Tag
              color={AppointmentStatusColors[status?.key]}
              style={{
                minWidth: 110,
                textAlign: "center",
                fontWeight: 500,
                borderRadius: 6,
              }}
              icon={AppointmentStatusIcons[status?.key]}
            >
              {status?.label?.toUpperCase()}
            </Tag>
            <Text>{AppointmentStatusLabels[status?.key]}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
