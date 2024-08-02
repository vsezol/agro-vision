import { Flex, Layout, Typography } from "antd";
import { theme } from "../shared/ui/theme";

const { Text, Link } = Typography;

export const Footer = () => {
  return (
    <Layout.Footer>
      <Flex justify="space-between">
        <Text style={{ color: theme.colors.darkGray }}>
          © 2024 АгроВижен, Все права защищены
        </Text>

        <Flex gap={32}>
          <Link
            href={"mailto:ag.vision@mail.ru"}
            style={{ color: theme.colors.darkGray }}
          >
            Сообщить об ошибке
          </Link>

          <Link
            href={"https://main.agvision.ru"}
            style={{ color: theme.colors.darkGray }}
          >
            О нас
          </Link>
        </Flex>
      </Flex>
    </Layout.Footer>
  );
};
