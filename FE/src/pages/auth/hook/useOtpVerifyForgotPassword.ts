import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showError, showSuccess, showWarning } from "../../../untils/ShowToast";
import type { IVerifyOTPForgotPassword } from "../../../types/TypeAuth";
import {
  ResendOtpForgotPasswordAuth,
  VerifyOtpForgotPasswordAuth,
} from "../../../api/auth/auth.api";
import { formatParams } from "../../../untils/formatParams";

export const useOtpVerification = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(0); // 0 = cho phép gửi lại ngay
  const [stateLoading, setStateLoading] = useState({
    loadingResend: false,
    loadingSend: false,
  });

  // toggle loading state
  const handleTogglerLoading = useCallback((key: string, value: boolean) => {
    setStateLoading((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // handle otp input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // chỉ cho nhập số hoặc rỗng

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement;
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      prevInput?.focus();
    }
  };

  // verify otp
  const handleSubmit = useCallback(() => {
    const code = otp.join("");
    if (!code) {
      showWarning("OTP là bắt buộc không được để trống");
      return;
    }

    const body: IVerifyOTPForgotPassword = {
      email: email || "",
      Otp: code,
    };

    handleTogglerLoading("loadingSend", true);
    VerifyOtpForgotPasswordAuth(body)
      .then((res) => {
        if (res?.success) {
          showSuccess("Xác thực thành công");
          const query = formatParams({ email: email });
          navigate(`/auth/reset-password${query}`, { replace: true });
        } else {
          showWarning(res?.message);
        }
      })
      .catch((e) => {
        console.error("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      })
      .finally(() => {
        handleTogglerLoading("loadingSend", false);
      });
  }, [otp, email, navigate, handleTogglerLoading]);

  // resend otp
  const handleResendOtp = () => {
    handleTogglerLoading("loadingResend", true);
    ResendOtpForgotPasswordAuth({ email: email })
      .then((res) => {
        if (res?.success) {
          showSuccess("OTP đã được gửi về email của bạn");
          setTimeLeft(60); // ví dụ cho 60s đếm ngược
        } else {
          showWarning(res?.message);
        }
      })
      .catch((e) => {
        console.log("Có lỗi xảy ra", e);
        showError("Có lỗi xảy ra");
      })
      .finally(() => {
        handleTogglerLoading("loadingResend", false);
      });
  };

  // format time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    email,
    otp,
    timeLeft,
    stateLoading,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResendOtp,
    formatTime,
  };
};
