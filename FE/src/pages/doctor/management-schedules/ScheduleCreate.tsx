import { Button, Card, Flex } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { COLOR_PRIMARY } from "../../../constants";
import { formatTime } from "../../../untils/formatTime";
import MyDatePicker from "../../../components/datetimePicker/MyDatePicker";
import dayjs from "dayjs";
import { Skeleton } from "antd";
import { useScheduleCreate } from "../hook/useScheduleCreate";

export default function ScheduleCreate() {
  const {
    isLoading,
    loading,
    stateComponent,
    grouped,
    handleChangeDateTime,
    handleSelectSlot,
    handleSelectAll,
    handleSubmit,
  } = useScheduleCreate();
  return (
    <div className="space-y-6">
      <h3>Tạo lịch khám</h3>
      <Flex vertical gap={10}>
        {/* 🔥 Nút chọn tất cả */}
        <Flex justify="space-between" gap={10} style={{ marginBottom: 10 }}>
          <div style={{ width: 250 }}>
            <MyDatePicker
              defaultValue={dayjs()}
              onChange={handleChangeDateTime}
            />
          </div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSelectAll}>
              {Object.values(grouped)
                .flat()
                .every((slot: any) =>
                  stateComponent.TimeSlots.includes(slot.id)
                )
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </Button>
          </motion.div>
        </Flex>

        {isLoading ? (
          <>
            {[1, 2].map((i) => (
              <Card
                key={i}
                title={<Skeleton.Input active style={{ width: 120 }} />}
              >
                <Flex gap={10} wrap="wrap">
                  {[...Array(3)].map((_, idx) => (
                    <Skeleton.Button
                      key={idx}
                      active
                      style={{ width: 120, height: 40, borderRadius: 8 }}
                    />
                  ))}
                </Flex>
              </Card>
            ))}
          </>
        ) : (
          Object.entries(grouped).map(([name, slots]) => {
            const sorted = slots.sort((a, b) =>
              a.startTime.localeCompare(b.startTime)
            );

            return (
              <Card key={name} title={name}>
                <Flex gap={10} wrap="wrap">
                  {sorted?.map((slot: any) => (
                    <motion.div
                      key={slot.id}
                      onClick={() => handleSelectSlot(slot.id)}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: -10 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 16px",
                        border: `1px solid ${COLOR_PRIMARY}`,
                        borderRadius: 8,
                        background: stateComponent.TimeSlots.includes(slot?.id)
                          ? COLOR_PRIMARY
                          : "#fff",
                        color: stateComponent.TimeSlots.includes(slot?.id)
                          ? "#fff"
                          : COLOR_PRIMARY,
                        fontWeight: 500,
                        minWidth: 120,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                      }}
                    >
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </motion.div>
                  ))}
                </Flex>
              </Card>
            );
          })
        )}
      </Flex>

      <AnimatePresence>
        {stateComponent?.TimeSlots?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Flex justify="center" style={{ marginTop: 20 }}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  style={{ minWidth: 150 }}
                  onClick={handleSubmit}
                >
                  Xác nhận
                </Button>
              </motion.div>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
