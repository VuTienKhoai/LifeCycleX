import { useQuery } from "@tanstack/react-query";
import type { IMethodResult } from "../../types/ApiResponse";
import {
  GetAllSpecialtiesByIdHospital,
  getDetailSpecialties,
} from "./specialties.api";

export const queryGetAllSpecialtiesByIdHospital = (
  body?: Record<string, any>
) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllSpecialtiesByIdHospital", body],
    queryFn: () => GetAllSpecialtiesByIdHospital(body),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: !!body,
  });
};

export const queryGetDetailSpecialties = (params?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetDetailSpecialties", params],
    queryFn: () => getDetailSpecialties(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!params,
  });
};
