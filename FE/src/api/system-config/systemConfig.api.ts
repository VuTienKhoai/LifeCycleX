import { axiosClient } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import { formatParams } from "../../untils/formatParams";

export const AddOrUpdateTimeSlot = (body: any): Promise<IMethodResult<any>> => {
  const url = `/SystemConfig/AddListTimeSlot`;
  return axiosClient.post(url, body);
};

export const DeleteTimeSlot = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/SystemConfig/DeleteTimeSlot${query}`;
  return axiosClient.post(url);
};

export const GetAllListTimeSlot = (
  params: any
): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/SystemConfig/GetAllListTimeSlot${query}`;
  return axiosClient.get(url);
};

export const GetAllListTimeSlotDoctor = (): Promise<IMethodResult<any>> => {
  const url = `/SystemConfig/GetAllListTimeSlotDoctor`;
  return axiosClient.get(url);
};
