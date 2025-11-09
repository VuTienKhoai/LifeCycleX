import { useCallback, useState } from "react";
import { LoginAuth } from "../../../api/auth/auth.api";
import type { IAuthLogin } from "../../../types/TypeAuth";
import { useDispatch } from "react-redux";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { setUserState } from "../../../features/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../../constants";
import { queryGetInfoUser } from "../../../api/user/user.query";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refetch } = queryGetInfoUser();

  const initUserInfo = useCallback(async () => {
    try {
      const res = await refetch();
      if (res.data?.success) {
        const user = res.data.data;
        dispatch(setUserState(user));
      } else {
        showWarning(res.data?.message || "Đăng nhập thất bại");
      }
    } catch {
      showError("Lấy thông tin người dùng thất bại");
    }
  }, [dispatch, refetch]);
  const handleSwitchRouter = useCallback((roleId: string) => {
    switch (roleId) {
      case ROLE.ADMIN:
        navigate("/admin/dashboard");
        break;

      case ROLE.HOSPITAL:
        navigate("/hospital/dashboard");
        break;

      case ROLE.DOCTOR:
        navigate("/doctor/dashboard");
        break;

      case ROLE.USER:
        navigate("/user/home");
        break;

      default:
        navigate("/auth/login");
        break;
    }
  }, []);

  const handleLogin = async (value: IAuthLogin) => {
    if (!value) return;
    setLoading(true);

    try {
      const res = await LoginAuth(value);
      if (res?.success) {
        console.log("🚀 ~ handleLogin ~ res:", res);
        showSuccess("Đăng nhập thành công");
        // handleSwitchRouter(infoUser.Role);
      } else {
        showWarning(res?.message);
      }
    } catch (e) {
      console.error("Có lỗi xảy ra", e);
      showError("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
};
