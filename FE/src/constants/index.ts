export * from "./Role";
export * from "./Url";
export * from "./Color";
export const PAGE_DEFAULT = 5;

export const GENDER_OPTIONS = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" },
  { label: "Khác", value: "Khác" },
];

export const POSITION_OPTIONS = [
  { label: "Bác sĩ", value: "Bác sĩ" },
  { label: "Bác sĩ chính", value: "Bác sĩ chính" },
  { label: "Bác sĩ cao cấp", value: "Bác sĩ cao cấp" },
  { label: "Trưởng khoa", value: "Trưởng khoa" },
  { label: "Phó khoa", value: "Phó khoa" },
  { label: "Điều dưỡng trưởng", value: "Điều dưỡng trưởng" },
  { label: "Giám đốc bệnh viện", value: "Giám đốc bệnh viện" },
  { label: "Phó giám đốc bệnh viện", value: "Phó giám đốc bệnh viện" },
];

export const AppointmentStatus = {
  AVAILABLE: "available",
  BOOKED: "booked",
  COMPLETED: "completed",
  CANCELED: "canceled",
  INPROGRESS: "inprogress",
};

export type AppointmentStatusType =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

// Map hiển thị label
const AppointmentStatusLabel: Record<AppointmentStatusType, string> = {
  available: "Còn trống",
  booked: "Đã đặt",
  completed: "Hoàn thành",
  canceled: "Đã hủy",
  inprogress: "Đã check in",
};

export const getAppointmentStatusLabel = (status: string): string => {
  return (
    AppointmentStatusLabel[status as AppointmentStatusType] || "Không xác định"
  );
};
