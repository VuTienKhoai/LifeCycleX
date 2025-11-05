import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import { SendOtpForgotPasswordAuth } from "../../../api/auth/auth.api";
import { formatParams } from "../../../untils/formatParams";
export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = useCallback(
    async (values: { email: string }) => {
      if (!values) return;
      setLoading(true);
      try {
        const res = await SendOtpForgotPasswordAuth(values);
        if (res?.success) {
          showSuccess("OTP đã được gửi về email của bạn");
          const query = formatParams(values);
          navigate(`/auth/otp-verify-forgot-password${query}`, {
            replace: true,
          });
        } else {
          showWarning(res?.message);
        }
      } catch (e) {
        console.error("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return {
    loading,
    handleForgotPassword,
  };
};
