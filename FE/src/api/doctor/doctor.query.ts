import { useQuery } from "@tanstack/react-query";
import type { IMethodResult } from "../../types/ApiResponse";
import { GetAllDoctor, GetDetailDoctor } from "./doctor.api";

export const queryGetAllDoctor = (body?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllDoctor", body],
    queryFn: () => GetAllDoctor(body),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: !!body,
  });
};

export const queryGetDetailDoctor = (params?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetDetailDoctor", params],
    queryFn: () => GetDetailDoctor(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!params,
  });
};
