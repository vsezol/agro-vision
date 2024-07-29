import { Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Routes } from "../shared/routes";
import { Logo } from "../shared/ui/logo";
import { NavMenu } from "./nav-menu";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header style={{ marginBottom: 1 }}>
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <Flex
          align="center"
          justify="space-between"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(Routes.Rating)}
        >
          <Logo />
        </Flex>

        <NavMenu />

        <div></div>
      </Flex>
    </Layout.Header>
  );
};
