import { axiosClient } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";

export const addSchedules = (body: any): Promise<IMethodResult<any>> => {
  const url = `/Schedules/AddScheduleAsync`;
  return axiosClient.post(url, body);
};

export const getAllAppointmentsAsync = (
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/Schedules/GetAllAppointmentsAsync`;
  return axiosClient.post(url, body);
};
