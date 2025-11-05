import { Header } from "antd/es/layout/layout";
import { memo, useState } from "react";
import { COLOR_DEFAULT_1 } from "../constants";
import { Button, Dropdown, Flex, Image, type MenuProps } from "antd";
import person from "../assets/img/person.png";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { infoUserState } from "../features/slices/user.slice";
import type { UserLogin } from "../untils/types/TypeUserLogin";

interface IHeaderAdmin {
  collapsed: boolean;
  colorBgContainer: string;
  roleId: string | null;
  dropdownItems: MenuProps["items"] | undefined;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderAdmin(props: IHeaderAdmin) {
  const { collapsed, colorBgContainer, roleId, dropdownItems, setCollapsed } =
    props;
  const infoUser: UserLogin = useSelector(infoUserState);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          backgroundColor: COLOR_DEFAULT_1,
        }}
      >
        <div style={{ display: "flex", width: "40%", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Button
            type="text"
            icon={
              isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
            }
            onClick={toggleFullScreen}
            style={{ fontSize: "18px" }}
          />
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow
          >
            <Flex
              style={{
                alignItems: "center",
                cursor: "pointer",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: 500 }}>
                {infoUser?.name || "Người dùng"}
              </span>
              <Image
                src={infoUser?.avatar || person}
                alt="avatar"
                preview={false}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Flex>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

export default memo(HeaderAdmin);
