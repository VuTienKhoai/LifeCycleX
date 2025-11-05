import { Button, Typography, Image, Input } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/logo-hopitech.png";
import { COLOR_DEFAULT } from "../../constants";
import AuthLayout from "../../components/layout/AuthLayout";
import { useOtpVerification } from "./hook/useOtpVerifyForgotPassword";

const { Title } = Typography;

const OtpVerifyForgotPassword = () => {
  const {
    otp,
    timeLeft,
    stateLoading,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResendOtp,
    formatTime,
  } = useOtpVerification();

  return (
    <AuthLayout>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Image src={logo} alt="logo" preview={false} width={100} />
      </div>

      {/* Title */}
      <Title
        level={3}
        style={{ textAlign: "center", marginBottom: 8, fontWeight: 700 }}
      >
        Xác thực OTP
      </Title>
      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 32,
          color: "rgba(0,0,0,0.45)",
        }}
      >
        Vui lòng nhập mã OTP gồm 6 số đã gửi về email/SMS của bạn
      </Typography.Text>

      {/* OTP Inputs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 32,
        }}
      >
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            style={{
              width: 48,
              height: 48,
              textAlign: "center",
              fontSize: 20,
              borderRadius: 8,
            }}
          />
        ))}
      </div>

      {/* Submit */}
      <Button
        type="primary"
        block
        size="large"
        style={{ borderRadius: 8, backgroundColor: COLOR_DEFAULT }}
        onClick={handleSubmit}
        disabled={otp.some((d) => d === "")}
        loading={stateLoading.loadingSend}
      >
        Xác nhận
      </Button>

      {/* Resend OTP */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {timeLeft > 0 ? (
          <Typography.Text>
            Vui lòng thử lại sau{" "}
            <b style={{ color: COLOR_DEFAULT }}>{formatTime(timeLeft)}</b>
          </Typography.Text>
        ) : (
          <Button
            type="link"
            style={{ color: COLOR_DEFAULT, padding: 0 }}
            onClick={handleResendOtp}
            loading={stateLoading.loadingResend}
          >
            Gửi lại OTP
          </Button>
        )}
      </div>

      {/* Back to login */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Typography.Text>
          Quay lại{" "}
          <Link to="/auth/login" style={{ color: COLOR_DEFAULT }}>
            Đăng nhập
          </Link>
        </Typography.Text>
      </div>
    </AuthLayout>
  );
};

export default OtpVerifyForgotPassword;
