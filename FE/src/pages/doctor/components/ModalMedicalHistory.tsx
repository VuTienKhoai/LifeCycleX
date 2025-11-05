import {
  Modal,
  Descriptions,
  Avatar,
  Divider,
  Button,
  Typography,
  Flex,
  Tag,
  Tooltip,
} from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { formatDate } from "../../../untils/FormatDate";
import { formatPrice } from "../../../untils/formatPrice";
import type { TypeMedicalHistory } from "../../../types/TypeMedicalHistory";

const { Title, Text } = Typography;

interface IModalMedicalHistory {
  open: boolean;
  onCancel: () => void;
  data: TypeMedicalHistory | undefined;
}

const ModalMedicalHistory = ({
  open,
  onCancel,
  data,
}: IModalMedicalHistory) => {
  if (!data) return null;
  const { userInfo, doctorInfo } = data;

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={onCancel}
          footer={null}
          width={700}
          centered
          closable={false}
          modalRender={(dom) => (
            <motion.div
              key="animated-modal"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {dom}
            </motion.div>
          )}
        >
          {/* Header */}
          <Flex
            align="center"
            justify="space-between"
            style={{
              background: "linear-gradient(135deg, #1677ff, #69c0ff)",
              padding: "14px 24px",
              color: "#fff",
            }}
          >
            <Title level={4} style={{ margin: 0, color: "#fff" }}>
              Thông tin bệnh án
            </Title>
            <Button type="text" style={{ color: "white" }} onClick={onCancel}>
              Đóng
            </Button>
          </Flex>

          {/* Nội dung */}
          <motion.div
            style={{ padding: 24 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* 🧍‍♂️ Thông tin bệnh nhân */}
            <Descriptions
              bordered
              title={
                <Flex align="center" gap={12}>
                  <Avatar
                    src={userInfo?.avatar}
                    size={48}
                    icon={<UserOutlined />}
                  />
                  <Text strong style={{ fontSize: 16 }}>
                    Bệnh nhân
                  </Text>
                </Flex>
              }
              column={2}
              size="middle"
              labelStyle={{ fontWeight: 600, width: 150 }}
            >
              <Descriptions.Item label="Họ và tên">
                {userInfo?.name || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {userInfo?.phoneNumber || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {userInfo?.email || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                <Tooltip title={userInfo?.address}>
                  {userInfo?.address || "—"}
                </Tooltip>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* 👨‍⚕️ Bác sĩ */}
            <Descriptions
              bordered
              title={
                <Flex align="center" gap={12}>
                  <Avatar src={doctorInfo?.avatar} size={48} />
                  <Text strong style={{ fontSize: 16 }}>
                    Bác sĩ phụ trách
                  </Text>
                </Flex>
              }
              column={2}
              size="middle"
              labelStyle={{ fontWeight: 600, width: 150 }}
            >
              <Descriptions.Item label="Họ và tên">
                {doctorInfo?.name || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Chức vụ">
                {doctorInfo?.position || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Chuyên khoa">
                {data.nameSpecialty || "—"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* 🧾 Thông tin bệnh án */}
            <Descriptions
              bordered
              title="Chi tiết bệnh án"
              column={2}
              size="middle"
              labelStyle={{ fontWeight: 600, width: 150 }}
            >
              <Descriptions.Item label="Ngày khám">
                {formatDate(data.appointmentDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo hồ sơ">
                {formatDate(data.createdDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Chuẩn đoán" span={2}>
                <Tooltip title={data.diagnosis}>
                  {data.diagnosis || "—"}
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label="Phương pháp điều trị" span={2}>
                <Tooltip title={data.medication}>
                  {data.medication || "—"}
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label="Giá khám">
                <Tag color="blue">{formatPrice(data.price)}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default memo(ModalMedicalHistory);
