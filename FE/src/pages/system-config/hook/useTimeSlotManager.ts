// src/hooks/useTimeSlotManager.ts
import { useState } from "react";
import { Form, message } from "antd";
import { useSelector } from "react-redux";
import { infoUserState } from "../../../features/slices/user.slice";
import { queryGetAllTimeSlots } from "../../../api/system-config/systemConfig.query";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { AddOrUpdateTimeSlot } from "../../../api/system-config/systemConfig.api";

interface Slot {
  id: number;
  start: string;
  end: string;
}

export const useTimeSlotManager = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [form] = Form.useForm();
  const infoHospital = useSelector(infoUserState);
  const [loading, setLoading] = useState(false);

  const { data: dataTimeSlot, refetch } = queryGetAllTimeSlots({
    idHospital: infoHospital?.id,
  });

  const generateSlots = (start: string, end: string, duration: number) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const fromMinutes = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    const newSlots: Slot[] = [];
    let cur = startMin;
    let idx = 1;

    while (cur + duration <= endMin) {
      newSlots.push({
        id: idx,
        start: fromMinutes(cur),
        end: fromMinutes(cur + duration),
      });
      cur += duration;
      idx++;
    }
    return newSlots;
  };

  const handleGenerate = () => {
    const values = form.getFieldsValue();
    const { start, end, duration } = values;
    const newSlots = generateSlots(
      start.format("HH:mm"),
      end.format("HH:mm"),
      Number(duration)
    );
    setSlots(newSlots);
  };

  const handleRemoveAll = () => {
    if (!slots.length) {
      showWarning("Không có khung giờ nào để xóa!");
      return;
    }
    setSlots([]);
    message.success("Đã xóa toàn bộ khung giờ!");
  };

  const handleRemoveSlot = (id: number) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleConfirm = () => {
    const values = form.getFieldsValue();
    const name = values.name;

    if (!slots.length) {
      showWarning("Chưa có slot nào để xác nhận!");
      return;
    }
    setLoading(true);
    const payload = slots.map((s) => ({
      hospitalId: infoHospital.id,
      name,
      startTime: s.start,
      endTime: s.end,
    }));

    AddOrUpdateTimeSlot({ timeSlots: payload })
      .then((res) => {
        res?.success ? showSuccess(res?.message) : showWarning(res?.message);
        if (res?.success) {
          refetch();
          setSlots([]);
        }
      })
      .catch(() => showError("Có lỗi xảy ra"))
      .finally(() => setLoading(false));
  };

  return {
    slots,
    setSlots,
    form,
    loading,
    handleGenerate,
    handleRemoveAll,
    handleRemoveSlot,
    handleConfirm,
    dataTimeSlot,
    refetch,
  };
};
