import { useQuery } from "@tanstack/react-query";
import {
  GetStatisticAdmin,
  GetStatisticDoctor,
  GetStatisticHospital,
} from "./dashboard.api";
import type { IMethodResult } from "../../types/ApiResponse";

export const queryGetStatisticAdmin = () => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetStatisticAdmin"],
    queryFn: () => GetStatisticAdmin(),
    staleTime: 0,
    gcTime: 0,
    enabled: true,
  });
};

export const queryGetStatisticHospital = () => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetStatisticHospital"],
    queryFn: () => GetStatisticHospital(),
    staleTime: 0,
    gcTime: 0,
    enabled: true,
  });
};

export const queryGetStatisticDoctor = () => {
  return useQuery<IMethodResult<any>>({
    queryKey: ["queryGetStatisticDoctor"],
    queryFn: () => GetStatisticDoctor(),
    staleTime: 0,
    gcTime: 0,
    enabled: true,
  });
};
