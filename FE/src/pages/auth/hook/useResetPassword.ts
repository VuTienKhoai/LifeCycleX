import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { IForgotPassword } from "../../../types/TypeAuth";
import { ForgotPassworrdAuth } from "../../../api/auth/auth.api";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (values: {
    password: string;
    confirm: string;
  }) => {
    const body: IForgotPassword = {
      email: email || "",
      password: values.password,
    };

    setLoading(true);
    ForgotPassworrdAuth(body)
      .then((res) => {
        if (res?.success) {
          showSuccess("Đổi mật khẩu thành công");
          navigate(`/auth/login`, { replace: true });
        } else {
          showWarning(res.message);
        }
      })
      .catch((e) => {
        console.log("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    handleResetPassword,
  };
};
