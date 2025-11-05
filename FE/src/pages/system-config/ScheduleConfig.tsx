import React from "react";
import { Card, Flex } from "antd";
import { COLOR_PRIMARY } from "../../constants";
import TimeSlotForm from "./components/TimeSlotForm";
import TimeSlotPreview from "./components/TimeSlotPreview";
import { useTimeSlotManager } from "./hook/useTimeSlotManager";
import ListTimeSlot from "./components/ListTimeSlot";

const ScheduleConfig: React.FC = () => {
  const {
    slots,
    form,
    loading,
    handleGenerate,
    handleRemoveAll,
    handleRemoveSlot,
    handleConfirm,
    dataTimeSlot,
    refetch,
  } = useTimeSlotManager();

  return (
    <Flex gap={20} vertical>
      <Card
        title="Cấu hình khung giờ"
        style={{ width: "100%", height: "100%" }}
        headStyle={{ background: COLOR_PRIMARY, color: "#fff" }}
        bodyStyle={{ padding: 24 }}
      >
        <TimeSlotForm form={form} onGenerate={handleGenerate} />
        <TimeSlotPreview
          slots={slots}
          name={form.getFieldValue("name")}
          loading={loading}
          onRemoveSlot={handleRemoveSlot}
          onRemoveAll={handleRemoveAll}
          onConfirm={handleConfirm}
        />
      </Card>
      <ListTimeSlot data={dataTimeSlot?.data} refetch={refetch} />
    </Flex>
  );
};

export default ScheduleConfig;
