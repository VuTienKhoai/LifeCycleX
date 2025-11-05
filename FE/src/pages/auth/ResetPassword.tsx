import { Form, Input, Button, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/logo-hopitech.png";
import { COLOR_DEFAULT } from "../../constants";
import AuthLayout from "../../components/layout/AuthLayout";
import { useResetPassword } from "./hook/useResetPassword";

const { Title } = Typography;

const ResetPassword = () => {
  const { loading, handleResetPassword } = useResetPassword();

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
        Đặt lại mật khẩu
      </Title>
      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 32,
          color: "rgba(0,0,0,0.45)",
        }}
      >
        Nhập mật khẩu mới cho tài khoản của bạn
      </Typography.Text>

      {/* Form */}
      <Form layout="vertical" onFinish={handleResetPassword}>
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu mới"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{ borderRadius: 8, backgroundColor: COLOR_DEFAULT }}
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
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

export default ResetPassword;
