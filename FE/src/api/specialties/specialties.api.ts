import { axiosClient } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import { formatParams } from "../../untils/formatParams";

export const GetAllSpecialtiesByIdHospital = (
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/Specialtes/GetAllSpecialtiesByIdHospital`;
  return axiosClient.post(url, body);
};

export const AddOrUpdateSpecialties = (
  body: any
): Promise<IMethodResult<any>> => {
  const url = `/Specialtes/AddOrUpdateSpecialties`;
  return axiosClient.post(url, body);
};

export const getDetailSpecialties = (
  params: any
): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/Specialtes/DetailSpecialties${query}`;
  return axiosClient.post(url);
};

export const deleteSpecialties = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/Specialtes/DeleteSpecialties${query}`;
  return axiosClient.post(url);
};
