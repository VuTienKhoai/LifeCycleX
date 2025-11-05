import {
  Modal,
  Descriptions,
  Avatar,
  Divider,
  Button,
  Tag,
  Typography,
  Flex,
} from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import type { TypeSchedule } from "../../../types/TypeSchedules";
import { formatPrice } from "./../../../untils/formatPrice";
import { memo, useCallback, useMemo } from "react";
import { formatDate } from "./../../../untils/FormatDate";
import { getAppointmentStatusLabel } from "../../../constants";

const { Title, Text } = Typography;
interface IModalPatientProfile {
  open: boolean;
  onCancel: () => void;
  data: TypeSchedule | undefined;
  onCreateMedicalRecord: (data: TypeSchedule) => void;
}
const ModalPatientProfile = ({
  open,
  onCancel,
  data,
  onCreateMedicalRecord,
}: IModalPatientProfile) => {
  if (!data) return null;
  const { userInfo, doctorInfo } = data;
  const getStatus = useCallback((status: string) => {
    if (!status) return "Không có ";
    return getAppointmentStatusLabel(status);
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={onCancel}
          footer={null}
          width={750}
          centered
          closable={false}
          modalRender={(dom) => (
            <motion.div
              key="animated-modal"
              initial={{ opacity: 0, scale: 0.8, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                // boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
              }}
            >
              {dom}
            </motion.div>
          )}
          destroyOnHidden
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: -60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
          >
            {/* Header */}
            <Flex
              align="center"
              justify="space-between"
              style={{
                background: "linear-gradient(135deg, #1677ff, #69c0ff)",
                padding: "16px 24px",
                color: "#fff",
              }}
            >
              <Flex align="center" gap={12}>
                {/* <Stethoscope style={{ fontSize: 22 }} /> */}
                <Title level={4} style={{ margin: 0, color: "#fff" }}>
                  Tiểu sử bệnh nhân
                </Title>
              </Flex>

              <Button type="text" style={{ color: "white" }} onClick={onCancel}>
                Đóng
              </Button>
            </Flex>

            {/* Nội dung chính */}
            <motion.div
              style={{ padding: 24 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* 🧍‍♂️ Bệnh nhân */}
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
                      Thông tin bệnh nhân
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
                <Descriptions.Item label="Giới tính">
                  {userInfo?.gender ? "Nam" : "Nữ"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">
                  {userInfo?.birthOfDay || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {userInfo?.phoneNumber || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {userInfo?.email || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ" span={2}>
                  {userInfo?.address || "—"}
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
                <Descriptions.Item label="Giới tính">
                  {doctorInfo?.gender ? "Nam" : "Nữ"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">
                  {formatDate(doctorInfo?.birthOfDay || "") || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Chuyên khoa">
                  {doctorInfo?.nameSpecialty || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Chức vụ" span={2}>
                  {doctorInfo?.position || "—"}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              {/* 📅 Lịch hẹn */}
              <Descriptions
                bordered
                title="Thông tin lịch hẹn"
                column={2}
                size="middle"
                labelStyle={{ fontWeight: 600, width: 150 }}
              >
                <Descriptions.Item label="Ngày hẹn">
                  {formatDate(data.appointmentDate)}
                </Descriptions.Item>
                <Descriptions.Item label="Khung giờ">
                  ({data.expectedStartTime} - {data.expectedEndTime})
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color="blue">
                    {getStatus(data?.status?.toLocaleLowerCase())}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Giá khám">
                  {formatPrice(data.price)}
                </Descriptions.Item>
                {data.lateReason && (
                  <Descriptions.Item label="Lý do đến trễ" span={2}>
                    {data.lateReason}
                  </Descriptions.Item>
                )}
              </Descriptions>

              {/* Footer */}
              <Flex justify="flex-end" style={{ marginTop: 32 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<SolutionOutlined />}
                    onClick={() => onCreateMedicalRecord(data)}
                  >
                    Tạo bệnh án
                  </Button>
                </motion.div>
              </Flex>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default memo(ModalPatientProfile);
