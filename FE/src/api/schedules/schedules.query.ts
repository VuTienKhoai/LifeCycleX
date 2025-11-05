import { useQuery } from "@tanstack/react-query";
import { getAllAppointmentsAsync } from "./schedules.api";
import type { IMethodResult } from "../../types/ApiResponse";

export const queryGetAllAppointment = (body?: Record<string, any>) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetAllSchedule", body],
    queryFn: () => getAllAppointmentsAsync(body),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: !!body,
  });
};
