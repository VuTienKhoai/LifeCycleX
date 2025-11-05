import { Form, Input, Button, Typography, Image, Flex } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/logo-hopitech.png";
import { COLOR_DEFAULT } from "../../constants";
import { useAuth } from "./hook/useLogin";
import AuthLayout from "../../components/layout/AuthLayout";

const { Title } = Typography;

const Login = () => {
  const { loading, handleLogin } = useAuth();

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
        Đăng nhập
      </Title>
      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 32,
          color: "rgba(0,0,0,0.45)",
        }}
      >
        Chào mừng bạn quay lại 👋
      </Typography.Text>

      {/* Form */}
      <Form layout="vertical" onFinish={handleLogin}>
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

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Flex justify="space-between" style={{ marginBottom: 16 }}>
          <Link style={{ color: COLOR_DEFAULT }} to="/auth/forgot-password">
            Quên mật khẩu?
          </Link>
        </Flex>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{ borderRadius: 8, backgroundColor: COLOR_DEFAULT }}
            loading={loading}
          >
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Login;
