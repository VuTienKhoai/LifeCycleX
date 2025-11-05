import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./user.api";

export const queryGetInfoUser = () => {
  return useQuery<any>({
    queryKey: ["queryGetInfoUser"],
    queryFn: () => getUserInfo(),
    staleTime: Infinity, // dữ liệu luôn fresh
    gcTime: Infinity,
    enabled: false,
  });
};
