import { useQuery } from "@tanstack/react-query";
import { getAllMedicalHistory } from "./medicalHistory.api";
import type { IMethodResult } from "../../types/ApiResponse";

export const queryGetAllMedicalHistory = (body?: any) => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["getAllMedicalHistory", body],
    queryFn: () => getAllMedicalHistory(body),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!body,
  });
};
