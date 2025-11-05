import type TypeDoctor from "./TypeDoctor";
import type { TypeUserResponse } from "./TypeUser";

export interface TimeSlotRequest {
  expectedStartTime: string; // "HH:mm:ss"
  expectedEndTime: string; // "HH:mm:ss"
}

export interface AddScheduleDoctorRequest {
  timeSlots: TimeSlotRequest[];
  appointmentDate: string; // dạng "yyyy-MM-dd" hoặc ISO string
}

export interface TypeSchedule {
  id: string;
  doctorId: string;
  patientId?: string | null;
  price: number;
  activateDay: string;
  appointmentDate: string;
  status: string;
  actualStartTime?: string | null;
  actualEndTime?: string | null;
  expectedStartTime: string;
  expectedEndTime: string;
  earlyArrivalMinutes: number;
  lateArrivalMinutes: number;
  lateReason: string;
  userInfo?: TypeUserResponse | null;
  created: string;
  doctorInfo?: TypeDoctor | null;
}
