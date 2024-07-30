import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { setVhVariable, store, useWindowResize } from "../shared/lib";
import { theme } from "../shared/ui/theme";
import { router } from "./router";

import { Provider } from "react-redux";
import { Loader } from "./loader";

function App() {
  useWindowResize(setVhVariable);

  return (
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            fontSize: theme.font.text.size,
            fontSizeHeading1: theme.font.h1.size,
            fontSizeHeading2: theme.font.h2.size,
            fontSizeHeading3: theme.font.h3.size,
            colorTextHeading: theme.colors.active,
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
            Select: {
              borderRadiusLG: 4,
              fontSizeLG: 16,
              optionFontSize: 16,
              optionSelectedFontWeight: 400,
              colorText: theme.colors.active,
            },
            Input: {
              borderRadiusLG: 4,
            },
            Checkbox: {
              colorText: "#8D8D8D",
              fontSize: 12,
            },
            Button: {
              borderRadiusLG: 4,
              colorPrimary: theme.colors.active,
              colorPrimaryHover: theme.colors.active,
              colorPrimaryActive: theme.colors.darkGray,
              colorBgContainerDisabled: "#E2E2E2",
            },
          },
        }}
      >
        <Provider store={store}>
          <Loader>
            <RouterProvider router={router} />
          </Loader>
        </Provider>
      </ConfigProvider>
    </StrictMode>
  );
}

export default App;
