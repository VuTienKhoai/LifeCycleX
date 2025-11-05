import { axiosClient, axiosClientFile } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import { formatParams } from "../../untils/formatParams";

export const getAllHospital = (body: any): Promise<IMethodResult<any>> => {
  const url = `/User/GetAllHospital`;
  return axiosClient.post(url, body);
};

export const getDetailHospital = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/User/GetDetailHospital${query}`;
  return axiosClient.post(url);
};

export const AddOrUpdateHospital = (body: any): Promise<IMethodResult<any>> => {
  const url = `/User/AddOrUpdateHospital`;
  return axiosClientFile.post(url, body);
};

export const deleteHospital = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/User/DeleteHospital${query}`;
  return axiosClientFile.post(url);
};
