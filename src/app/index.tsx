import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { setVhVariable, useWindowResize } from "../shared/lib";
import { theme } from "../shared/ui/theme";
import { router } from "./router";

function App() {
  useWindowResize(setVhVariable);

  return (
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 12,
          },
          components: {
            Layout: {
              bodyBg: theme.colors.background,
              headerBg: theme.colors.white,
              footerBg: theme.colors.active,
              footerPadding: "25px 60px",
            },
            Menu: {
              horizontalItemSelectedColor: theme.colors.active,
              itemColor: theme.colors.gray,
              fontSize: 16,
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>
  );
}

export default App;
