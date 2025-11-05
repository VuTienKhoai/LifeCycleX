import { Card, Button, Flex, Modal } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { COLOR_PRIMARY } from "../../../constants";
import { motion } from "framer-motion";
import { formatTime } from "../../../untils/formatTime";
import type { TypeTimeSlot } from "../../../types/TypeTimeSlot";
import { useCallback, useMemo } from "react";
import { DeleteTimeSlot } from "../../../api/system-config/systemConfig.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";

interface IListTimeSlot {
  data: TypeTimeSlot[] | undefined;
  refetch: () => void;
}

export default function ListTimeSlot(props: IListTimeSlot) {
  const { data, refetch } = props;
  const groupByName = useCallback((arr: TypeTimeSlot[] | undefined) => {
    return (arr ?? []).reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, TypeTimeSlot[]>);
  }, []);

  const grouped = useMemo(() => groupByName(data), [data, groupByName]);

  const confirmRemoveSlot = (id: string) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa lịch này?",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: "Hành động này sẽ không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      okButtonProps: {
        style: {
          fontWeight: "bold",
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        },
      },
      cancelButtonProps: {
        style: {
          fontWeight: "500",
        },
      },
      onOk: () => {
        // Trả về promise -> Modal sẽ hiển thị loading và chỉ đóng khi resolve
        return new Promise<void>((resolve, reject) => {
          onRemoveSlot(id)
            .then(() => {
              resolve(); // thành công thì modal đóng
            })
            .catch((err) => {
              console.error("Xóa thất bại:", err);
              reject(); // thất bại thì modal vẫn mở
            });
        });
      },
    });
  };

  const onRemoveSlot = async (id: string): Promise<void> => {
    console.log("Xóa slot có id:", id);
    try {
      const response = await DeleteTimeSlot({ id });
      if (response.success) {
        refetch();
      }
      response?.success
        ? showSuccess(response.message)
        : showWarning(response.message);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      showError("Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-6">
      <h3>Danh sách lịch dự kiến</h3>
      <Flex vertical gap={10}>
        {Object.entries(grouped).map(([name, slots]) => {
          const sorted = slots.sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );

          return (
            <Card key={name} title={name}>
              <Flex gap={10}>
                {sorted?.map((slot: TypeTimeSlot) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -10 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "6px 16px",
                      border: `1px solid ${COLOR_PRIMARY}`,
                      borderRadius: 8,
                      background: "#fff",
                      color: COLOR_PRIMARY,
                      fontWeight: 500,
                      minWidth: 120,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    {/* nút xóa góc phải */}
                    <Button
                      type="text"
                      size="small"
                      icon={
                        <CloseOutlined
                          style={{ fontSize: 12, color: "#ff4d4f" }}
                        />
                      }
                      onClick={() => confirmRemoveSlot(slot.id || "")}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 22,
                        height: 22,
                        padding: 0,
                        borderRadius: "50%",
                        background: "#fff",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </motion.div>
                ))}
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </div>
  );
}
