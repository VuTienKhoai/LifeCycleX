import { useQuery } from "@tanstack/react-query";
import { getAllHospital, getDetailHospital } from "./hospital.api";
import type { IMethodResult } from "../../types/ApiResponse";

export const queryGetAllHospital = (body?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllHospital", body],
    queryFn: () => getAllHospital(body),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: !!body,
  });
};

export const queryGetDetailHospital = (params?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetDetailHospital", params],
    queryFn: () => getDetailHospital(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!params,
  });
};
