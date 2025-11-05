// components/layouts/MainLayout.tsx
import React, { useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Image, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "antd";

import { getMenuByRole } from "./MenuIttem";
import { getRoleIdState, resetLogin } from "../features/slices/app.slice";
import { ROLE } from "../constants";
import { resetUserState } from "../features/slices/user.slice";
import logo from "../../src/assets/img/logo/logo-hopitech.png";
import logo_image from "../../src/assets/img/logo/background_image.png";
import "../css/layout/MainLayout.css";
import HeaderAdmin from "./HeaderAdmin";
const { Sider, Content } = Layout;

interface MainLayoutProps {
  basePath: string;
  defaultRole?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ basePath }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const roleId = useSelector(getRoleIdState);
  const menuItems = getMenuByRole(roleId);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(resetUserState());
    dispatch(resetLogin());
    navigate("/auth/login");
  };

  const handleProfile = () => {
    navigate(`/${basePath}/profile`);
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Trang cá nhân",
      icon: <UserOutlined />,
      onClick: handleProfile,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#2C3E50",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 130,
            padding: "12px 0",
          }}
        >
          <Image
            src={logo}
            alt="logo"
            preview={false}
            style={{
              width: collapsed ? 40 : 80,
              transition: "all 0.3s ease",
            }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/")[2]]}
          onClick={({ key }) => navigate(`/${basePath}/${key}`)}
          items={menuItems}
          style={{
            background: "transparent", // để ăn theo màu Sider
          }}
          rootClassName="custom-menu"
        />
      </Sider>

      <Layout>
        <HeaderAdmin
          collapsed={collapsed}
          dropdownItems={dropdownItems}
          roleId={roleId}
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
        />
        <Content
          style={{
            padding: 16,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            backgroundImage: `url(${logo_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.3)", // trắng trong suốt
              borderRadius: borderRadiusLG,
              padding: 24,
              minHeight: "100%", // để fill chiều cao
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // đổ bóng nhẹ
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
