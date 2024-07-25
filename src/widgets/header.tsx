import { Button, Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Routes } from "../shared/routes";
import { Logo } from "../shared/ui/logo";
import { UserIcon } from "../shared/ui/user-icon";
import { NavMenu } from "./nav-menu";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header style={{ marginBottom: 1 }}>
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <Flex align="center" justify="space-between">
          <Logo />
        </Flex>

        <NavMenu />

        <Flex align="center" justify="space-between">
          <Button type="link" onClick={() => navigate(Routes.Auth)}>
            <UserIcon />
          </Button>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};
