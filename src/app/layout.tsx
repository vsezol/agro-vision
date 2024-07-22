import { Flex, Layout as UiLayout } from "antd";
import { Outlet } from "react-router-dom";
import { Footer } from "../widgets/footer";
import { Header } from "../widgets/header";

export const Layout = () => {
  return (
    <UiLayout>
      <Flex vertical className="h-screen">
        <Header />

        <UiLayout.Content style={{ flexGrow: 1, height: "100%" }}>
          <Outlet />
        </UiLayout.Content>

        <Footer />
      </Flex>
    </UiLayout>
  );
};
