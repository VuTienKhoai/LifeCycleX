import { Card, Flex, Typography, Popover, Button, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import MyDatePicker from "../../../components/datetimePicker/MyDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import AppointmentLegend from "../components/AppointmentLegend";
import { queryGetAllAppointment } from "../../../api/schedules/schedules.query";
import {
  AppointmentStatus,
  COLOR_PRIMARY,
  type AppointmentStatusType,
} from "../../../constants";
import { AppointmentStatusColors } from "../../../constants/AppointmentStatus";
import { motion } from "framer-motion";
import { formatTime } from "../../../untils/formatTime";
import ModalPatientProfile from "../components/ModalPatientProfile";
import type { TypeSchedule } from "../../../types/TypeSchedules";
import { showWarning } from "../../../untils/ShowToast";
import { useNavigate } from "react-router-dom";
import { formatParams } from "../../../untils/formatParams";

const { Text } = Typography;

export default function ScheduleTracking() {
  const [searchSchedule, setSearchSchedule] = useState({
    appointmentDate: dayjs().format("YYYY-MM-DD"),
    status: null,
    page: 1,
    pageSize: 999,
  });
  const navigate = useNavigate();

  const [modaleReady, setModalReady] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<TypeSchedule>();
  const groupByName = useCallback((arr: any[] | undefined) => {
    return (arr ?? []).reduce((acc, item) => {
      if (!acc[item.nameTimeSlot]) acc[item.nameTimeSlot] = [];
      acc[item.nameTimeSlot].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  }, []);

  const { data: dataSchedules, isFetching } = queryGetAllAppointment({
    pageInfo: {
      pageSize: searchSchedule.pageSize,
      page: searchSchedule.page,
    },
    appointmentDate: searchSchedule.appointmentDate,
    status: searchSchedule?.status,
  });

  const grouped = useMemo(
    () => groupByName(dataSchedules?.data),
    [dataSchedules, groupByName]
  );

  const handleChangeDateTime = useCallback((date: Dayjs | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    setSearchSchedule((prev) => ({
      ...prev,
      appointmentDate: formattedDate,
    }));
  }, []);

  const handleSelectSlot = useCallback((data: TypeSchedule) => {
    console.log(data);
  }, []);

  const handleOpenModal = useCallback((data: TypeSchedule) => {
    console.log("🚀 ~ ScheduleTracking ~ data:", data);
    const isCheckStatus =
      data?.status?.toLocaleLowerCase() == AppointmentStatus.INPROGRESS ||
      data?.status?.toLocaleLowerCase() == AppointmentStatus.CANCELED;
    if (!isCheckStatus) {
      showWarning("Lịch này chưa trong trạng thái sẵn sàng ");
      return;
    }
    setModalReady(true);
    setSelectedSchedule(data);
  }, []);

  const handleAddMedical = useCallback((data: TypeSchedule) => {
    console.log("Đã chọn", data);
    const body = {
      idSchedule: data?.id,
    };
    const query = formatParams(body);
    navigate(`/doctor/add-medical-history${query}`);
  }, []);

  return (
    <div className="space-y-6">
      <Flex justify="space-between" align="center">
        <div>
          <h3>Theo dõi lịch khám</h3>
          <Text type="secondary">
            Quản lý và giám sát trạng thái lịch hẹn của bệnh nhân
          </Text>
        </div>
        <Popover
          content={<AppointmentLegend />}
          title={null}
          placement="leftTop"
          trigger={["hover", "click"]}
        >
          <Button
            type="default"
            shape="round"
            icon={<QuestionCircleOutlined />}
          >
            Hướng dẫn
          </Button>
        </Popover>
      </Flex>

      <Flex align="center" gap={12} style={{ margin: "20px 0" }}>
        <Text strong style={{ minWidth: 80 }}>
          Chọn ngày:
        </Text>
        <div style={{ width: 250 }}>
          <MyDatePicker
            defaultValue={dayjs()}
            onChange={handleChangeDateTime}
          />
        </div>
      </Flex>

      {!isFetching && (!dataSchedules || dataSchedules?.data?.length === 0) && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px solid #f0f0f0",
            borderRadius: 8,
            textAlign: "center",
            color: "#888",
            width: "100%",
          }}
        >
          📅 Chưa có dữ liệu lịch hẹn cho ngày này
        </div>
      )}

      <Flex wrap gap={16} align="flex-start">
        {isFetching ? (
          <>
            {[1, 2].map((i) => (
              <Card
                key={i}
                style={{ borderRadius: 12, flex: 1, minWidth: 280 }}
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
          Object.entries(grouped).map(([name, slots]: [any, any]) => {
            const sorted = slots.sort((a: any, b: any) =>
              a.expectedStartTime.localeCompare(b.expectedEndTime)
            );

            return (
              <Card
                key={name}
                title={name}
                style={{ borderRadius: 12, flex: 1, minWidth: 280 }}
              >
                <Flex gap={10} wrap="wrap">
                  {sorted?.map((slot: any) => {
                    const bgColor =
                      AppointmentStatusColors[
                        slot?.status?.toLowerCase?.() as AppointmentStatusType
                      ] || "#d9d9d9";

                    return (
                      <motion.div
                        key={slot.id}
                        // onClick={() => handleSelectSlot(slot)}
                        onClick={() => handleOpenModal(slot)}
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
                          // display: "inline-flex",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px 16px",
                          border: `1px solid ${COLOR_PRIMARY}`,
                          borderRadius: 8,
                          background: bgColor,
                          color: "#fff",
                          fontWeight: 500,
                          minWidth: 120,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        }}
                      >
                        {slot?.userInfo && (
                          <div>{`Tên bệnh nhân: ${slot?.userInfo?.name}`} </div>
                        )}

                        <p style={{ textAlign: "center", marginBottom: 0 }}>
                          {formatTime(slot.expectedStartTime)} -{" "}
                          {formatTime(slot.expectedEndTime)}
                        </p>
                      </motion.div>
                    );
                  })}
                </Flex>
              </Card>
            );
          })
        )}
      </Flex>
      <ModalPatientProfile
        data={selectedSchedule}
        onCancel={() => setModalReady(false)}
        open={modaleReady}
        onCreateMedicalRecord={handleAddMedical}
      />
    </div>
  );
}
