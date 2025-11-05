// src/hooks/useInitializeApp.ts
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUserState } from "../features/slices/user.slice";
import { setAppState } from "../features/slices/app.slice";
import { showError, showWarning } from "../untils/ShowToast";
import { ROLE } from "../constants";
import { queryGetInfoUser } from "../api/user/user.query";
import { useQueryClient } from "@tanstack/react-query";

export const useInitializeApp = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { refetch } = queryGetInfoUser();
  const queryClient = useQueryClient();

  const initUserInfo = useCallback(async () => {
    if (!token) return; // Không có token thì bỏ qua

    // Check cache trước
    const cached = queryClient.getQueryData<any>(["queryGetInfoUser"]);
    if (cached?.success) {
      const user = cached.data;
      dispatch(setUserState(user));
      dispatch(
        setAppState({
          role_id: user?.role || ROLE.USER,
          token,
        })
      );
      return;
    }

    // Nếu chưa có cache thì gọi API
    try {
      const res = await refetch();
      if (res.data?.success) {
        const user = res.data.data;
        dispatch(setUserState(user));
        dispatch(
          setAppState({
            role_id: user?.role || ROLE.USER,
            token,
          })
        );
      } else {
        showWarning(res.data?.message || "Đăng nhập thất bại");
      }
    } catch {
      showError("Lấy thông tin người dùng thất bại");
    }
  }, [dispatch, token, refetch, queryClient]);

  useEffect(() => {
    initUserInfo();
  }, [initUserInfo]);

  return { initUserInfo };
};
