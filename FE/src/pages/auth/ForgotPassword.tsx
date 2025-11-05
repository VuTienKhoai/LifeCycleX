import { Form, Input, Button, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/logo-hopitech.png";
import { COLOR_DEFAULT } from "../../constants";
import AuthLayout from "../../components/layout/AuthLayout";
import { useForgotPassword } from "./hook/useForgotPassword";

const { Title } = Typography;

const ForgotPassword = () => {
  const { loading, handleForgotPassword } = useForgotPassword();

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
        Quên mật khẩu
      </Title>
      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 32,
          color: "rgba(0,0,0,0.45)",
        }}
      >
        Nhập email để đặt lại mật khẩu
      </Typography.Text>

      {/* Form */}
      <Form layout="vertical" onFinish={handleForgotPassword}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input
            placeholder="Nhập email"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
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

export default ForgotPassword;
