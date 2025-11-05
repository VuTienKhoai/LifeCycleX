import { Form, Input, Button, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/logo-hopitech.png";
import { COLOR_DEFAULT } from "../../constants";
import AuthLayout from "../../components/layout/AuthLayout";

const { Title } = Typography;

const Register = () => {
  const handleRegister = (values: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    address: string;
  }) => {
    console.log("🚀 ~ Register ~ values:", values);
    // TODO: Gọi API register ở đây
  };

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
        Đăng ký
      </Title>
      <Typography.Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 32,
          color: "rgba(0,0,0,0.45)",
        }}
      >
        Tạo tài khoản mới để bắt đầu sử dụng dịch vụ
      </Typography.Text>

      {/* Form */}
      <Form layout="vertical" onFinish={handleRegister}>
        {/* Full Name */}
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input
            placeholder="Nhập họ và tên"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Email */}
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

        {/* Phone Number */}
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Address */}
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input
            placeholder="Nhập địa chỉ"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
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
            placeholder="Xác nhận mật khẩu"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{ borderRadius: 8, backgroundColor: COLOR_DEFAULT }}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <Typography.Text>
          Đã có tài khoản?{" "}
          <Link to="/auth/login" style={{ color: COLOR_DEFAULT }}>
            Đăng nhập
          </Link>
        </Typography.Text>
      </div>
    </AuthLayout>
  );
};

export default Register;
