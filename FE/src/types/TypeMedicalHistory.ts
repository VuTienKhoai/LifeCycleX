import type TypeDoctor from "./TypeDoctor";
import type TypeHospital from "./TypeHospital";
import type { TypeUserResponse } from "./TypeUser";

export interface TypeMedicalHistory {
  id: string;
  appointmentDate: string;
  createdDate: string;
  diagnosis: string;
  medication: string;
  doctorId: string;
  doctorInfo?: TypeDoctor | null;
  patientId?: string | null;
  price: number;
  userInfo?: TypeUserResponse | null;
  nameSpecialty?: string | null;
  hospitalInfo?: TypeHospital;
}
