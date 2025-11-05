import { Flex, Space, Tooltip, type TableColumnsType, Button } from "antd";
import {
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BellFilled,
} from "@ant-design/icons";
import type { TypeNotification } from "../../../types/TypeNotification";
import CustomTable from "../../../components/CustomTable";
import DebouncedSearch from "../../../components/input/DebouncedSearch";
import { useNotificationList } from "./hook/useNotificationList";
import { motion } from "framer-motion";

export default function ListNotification() {
  const {
    data,
    total,
    loading,
    searchNotification,
    handlePageChange,
    handleAdd,
    handleView,
    handleDelete,
    handleSearchNotification,
  } = useNotificationList();

  const columns: TableColumnsType<TypeNotification> = [
    {
      title: "Người gửi",
      dataIndex: "senderId",
      key: "senderId",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Người nhận",
      dataIndex: "receiverId",
      key: "receiverId",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "body",
      key: "body",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Device Token",
      dataIndex: "deviceTokenId",
      key: "deviceTokenId",
      align: "center",
      render: (value: string) => (
        <Tooltip title={value}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isRead",
      key: "isRead",
      render: (value: boolean) =>
        value ? (
          <Tooltip title="Đã đọc">
            <CheckCircleOutlined style={{ color: "green", fontSize: 18 }} />
          </Tooltip>
        ) : (
          <Tooltip title="Chưa đọc">
            <CloseCircleOutlined style={{ color: "red", fontSize: 18 }} />
          </Tooltip>
        ),
      align: "center",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record: TypeNotification) => (
        <Space size="middle">
          <Button type="link">Xem chi tiết</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Space>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ duration: 0.25 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="primary"
              icon={<BellFilled />}
              onClick={handleAdd}
              style={{
                background: "linear-gradient(90deg, #1890ff 0%, #40a9ff 100%)",
                borderRadius: 10,
                padding: "8px 20px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            >
              Gửi thông báo ngay
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ duration: 0.25 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              icon={<ClockCircleOutlined />}
              onClick={handleAdd}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
                borderRadius: 10,
                padding: "8px 20px",
                boxShadow: "0 3px 8px rgba(24,144,255,0.2)",
              }}
            >
              Lên lịch thông báo
            </Button>
          </motion.div>
        </Space>
        <DebouncedSearch
          placeholder="Tìm kiếm theo tiêu đề, nội dung..."
          value={searchNotification.keyword}
          onSearch={handleSearchNotification}
          style={{ width: 300 }}
        />
      </Flex>

      <CustomTable<TypeNotification>
        rowKey="senderId"
        columns={columns}
        dataSource={data || []}
        pageSize={searchNotification.pageSize}
        currentPage={searchNotification.page}
        total={total || 0}
        scrollY={window.innerHeight - 300}
        loading={loading}
        onPageChange={handlePageChange}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        title="Danh sách thông báo"
      />
    </div>
  );
}
