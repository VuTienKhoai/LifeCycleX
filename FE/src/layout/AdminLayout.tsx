import React from "react";
import MainLayout from "./MainLayout";

interface LayoutProps {
  basePath: string;
}

const RoleLayout: React.FC<LayoutProps> = ({ basePath }) => {
  return <MainLayout basePath={basePath} />;
};

export default RoleLayout;
