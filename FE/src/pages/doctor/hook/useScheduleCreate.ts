import { useState, useCallback, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { queryGetAllListTimeSlotDoctor } from "../../../api/system-config/systemConfig.query";
import { addSchedules } from "../../../api/schedules/schedules.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { useQueryClient } from "@tanstack/react-query";

interface IRequestSchedule {
  TimeSlots: string[];
  AppointmentDate: string;
}

interface TypeTimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export const useScheduleCreate = () => {
  const { data, isLoading } = queryGetAllListTimeSlotDoctor();
  const queryClient: any = useQueryClient();
  const [stateComponent, setStateComponent] = useState<IRequestSchedule>({
    TimeSlots: [],
    AppointmentDate: dayjs().format("YYYY-MM-DD"), // mặc định hôm nay
  });

  const [loading, setLoading] = useState(false);

  // Group theo name
  const groupByName = useCallback((arr: TypeTimeSlot[] | undefined) => {
    return (arr ?? []).reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, TypeTimeSlot[]>);
  }, []);

  const grouped = useMemo(() => groupByName(data?.data), [data, groupByName]);

  // Thay đổi ngày
  const handleChangeDateTime = useCallback((date: Dayjs | null) => {
    if (!date) return;
    const formattedDate = date.format("YYYY-MM-DD");
    setStateComponent((prev) => ({
      ...prev,
      AppointmentDate: formattedDate,
    }));
  }, []);

  // Chọn slot
  const handleSelectSlot = useCallback((id: string | undefined) => {
    if (!id) return;
    setStateComponent((prev) => {
      const exists = prev.TimeSlots.includes(id);
      return {
        ...prev,
        TimeSlots: exists
          ? prev.TimeSlots.filter((item) => item !== id) // bỏ nếu đã chọn
          : [...prev.TimeSlots, id], // thêm nếu chưa chọn
      };
    });
  }, []);

  // Chọn tất cả
  const handleSelectAll = useCallback(() => {
    const allIds = Object.values(grouped)
      .flat()
      .map((slot) => slot.id);

    setStateComponent((prev) => {
      const isAllSelected =
        allIds.length > 0 && allIds.every((id) => prev.TimeSlots.includes(id));
      return {
        ...prev,
        TimeSlots: isAllSelected ? [] : allIds,
      };
    });
  }, [grouped]);

  // Submit
  const handleSubmit = useCallback(() => {
    setLoading(true);
    addSchedules(stateComponent)
      .then((res) => {
        res?.success ? showSuccess(res?.message) : showWarning(res?.message);
        if (res?.success) {
          setStateComponent((prev) => ({
            ...prev,
            TimeSlots: [],
          }));
          queryClient.removeQueries(["queryGetAllSchedule"]);
        }
      })
      .catch((e) => {
        console.error("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stateComponent]);

  return {
    data,
    isLoading,
    loading,
    stateComponent,
    grouped,
    handleChangeDateTime,
    handleSelectSlot,
    handleSelectAll,
    handleSubmit,
  };
};
