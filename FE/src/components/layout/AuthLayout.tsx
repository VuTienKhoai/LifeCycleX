import { Col, Row } from "antd";
import type { ReactNode } from "react";
import backgroundBanner from "../../assets/img/logo/background_authen.webp";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Row style={{ height: "100vh" }}>
      {/* Left Content */}
      <Col
        xs={24}
        md={24}
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "40px 32px",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {children}
        </div>
      </Col>

      {/* Right Background */}
      <Col xs={0} md={0} lg={12}>
        <div
          style={{
            height: "100%",
            background: "#f9f9f9",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundImage: `url(${backgroundBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center 85%",
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default AuthLayout;
