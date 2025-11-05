import { axiosClient } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";

export const AddOrUpdateMedicalHistory = (
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/MedicalHistory/AddOrUpdateMedicalHistory`;
  return axiosClient.post(url, body);
};

export const getAllMedicalHistory = (
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/MedicalHistory/ListMedicalHistory`;
  return axiosClient.post(url, body);
};
