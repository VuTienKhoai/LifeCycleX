import { axiosClient, axiosClientFile } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";
import { formatParams } from "../../untils/formatParams";

export const GetAllDoctor = (body: any): Promise<IMethodResult<any>> => {
  const url = `/User/GetAllDoctor`;
  return axiosClient.post(url, body);
};

export const AddOrUpdateDoctor = (body: any): Promise<IMethodResult<any>> => {
  const url = `/User/AddOrUpdateDoctor`;
  return axiosClientFile.post(url, body);
};

export const GetDetailDoctor = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/User/GetDetailDoctor${query}`;
  return axiosClientFile.post(url);
};

export const deleteDoctor = (params: any): Promise<IMethodResult<any>> => {
  const query = formatParams(params);
  const url = `/User/DeleteDoctor${query}`;
  return axiosClient.post(url);
};
