import { useQuery } from "@tanstack/react-query";
import type { IMethodResult } from "../../types/ApiResponse";
import {
  GetAllListTimeSlot,
  GetAllListTimeSlotDoctor,
} from "./systemConfig.api";

export const queryGetAllTimeSlots = (params?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllTimeSlots", params],
    queryFn: () => GetAllListTimeSlot(params),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!params,
  });
};

export const queryGetAllListTimeSlotDoctor = () => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllListTimeSlotDoctor"],
    queryFn: () => GetAllListTimeSlotDoctor(),
    staleTime: 10 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    enabled: true,
  });
};
