import { Flex, Layout } from "antd";
import { Logo } from "../shared/ui/logo";
import { UserIcon } from "../shared/ui/user-icon";
import { NavMenu } from "./nav-menu";

export const Header = () => {
  return (
    <Layout.Header style={{ marginBottom: 1 }}>
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <Flex align="center" justify="space-between">
          <Logo />
        </Flex>

        <NavMenu />

        <Flex align="center" justify="space-between">
          <UserIcon />
        </Flex>
      </Flex>
    </Layout.Header>
  );
};
