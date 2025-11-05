import { memo } from "react";
import { Button, Space, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { COLOR_PRIMARY } from "../../../constants";

interface Slot {
  id: number;
  start: string;
  end: string;
}

interface TimeSlotPreviewProps {
  slots: Slot[];
  name: string;
  loading: boolean;
  onRemoveSlot: (id: number) => void;
  onRemoveAll: () => void;
  onConfirm: () => void;
}

const TimeSlotPreview = ({
  slots,
  name,
  loading,
  onRemoveSlot,
  onRemoveAll,
  onConfirm,
}: TimeSlotPreviewProps) => {
  return (
    <>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Tag color={COLOR_PRIMARY}>{name}</Tag>
        <span style={{ fontWeight: 500 }}>Tổng khung giờ: {slots.length}</span>
      </div>

      <AnimatePresence>
        <Space wrap size={[12, 16]}>
          {slots.map((slot) => (
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
              {slot.start} - {slot.end}
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => onRemoveSlot(slot.id)}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              />
            </motion.div>
          ))}
        </Space>
      </AnimatePresence>

      {slots.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Space>
            <Button
              type="primary"
              style={{ background: COLOR_PRIMARY }}
              onClick={onConfirm}
              loading={loading}
            >
              Xác nhận
            </Button>
            <Button danger onClick={onRemoveAll}>
              Xóa tất cả
            </Button>
          </Space>
        </div>
      )}
    </>
  );
};

export default memo(TimeSlotPreview);
