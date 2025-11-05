// 📂 constants/appointmentStatus.ts

import { AppointmentStatus, type AppointmentStatusType } from ".";

export const DEFAULT_TEXT = "#db4437";
export const DEFAULT_TEXT_DARK = "#000";
export const DEFAULT_TEXT_1 = "#fff";
export const COLOR_DEFAULT = "#3AA999";
export const COLOR_DEFAULT_1 = "#fff";
export const COLOR_PRIMARY = "#1677ff";

export const AppointmentStatusColors: Record<AppointmentStatusType, string> = {
  [AppointmentStatus.AVAILABLE]: "#1890FF", // 🔵 Còn trống
  [AppointmentStatus.BOOKED]: "#FAAD14", // 🟡 Đã đặt
  [AppointmentStatus.COMPLETED]: "#52C41A", // 🟢 Hoàn thành
  [AppointmentStatus.CANCELED]: "#FF4D4F", // 🔴 Hủy
  [AppointmentStatus.INPROGRESS]: "#722ED1", // 🟣 Đang chờ khám
};

export const AppointmentStatusLabels: Record<AppointmentStatusType, string> = {
  [AppointmentStatus.AVAILABLE]: "Còn trống, có thể đặt lịch",
  [AppointmentStatus.BOOKED]: "Đã được đặt lịch",
  [AppointmentStatus.COMPLETED]: "Lịch hẹn đã hoàn thành",
  [AppointmentStatus.CANCELED]: "Lịch hẹn bị hủy",
  [AppointmentStatus.INPROGRESS]: "Đã check-in, chờ khám",
};
