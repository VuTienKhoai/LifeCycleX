import { axiosClient } from "../../services/axiosConfig";
import type { IMethodResult } from "../../types/ApiResponse";

export const GetStatisticAdmin = (): Promise<IMethodResult<any>> => {
  const url = `/Statistic/Admin`;
  return axiosClient.get(url);
};

export const GetStatisticHospital = (): Promise<IMethodResult<any>> => {
  const url = `/Statistic/Hospital`;
  return axiosClient.get(url);
};
export const GetStatisticDoctor = (): Promise<IMethodResult<any>> => {
  const url = `/Statistic/Doctor`;
  return axiosClient.get(url);
};
