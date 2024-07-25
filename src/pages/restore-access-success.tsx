import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import wallpaperUrl from "../assets/wallpaper.jpeg";
import { Routes } from "../shared/routes";
import { ArrowBackIcon } from "../shared/ui/arrow-back-icon";
import { MailIcon } from "../shared/ui/mail-icon";
import { theme } from "../shared/ui/theme";

const { Title, Text } = Typography;

export default function RestoreAccessSuccessPage() {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
      }}
    >
      <Flex
        vertical
        style={{
          padding: 32,
          backgroundColor: theme.colors.white,
          width: 388,
          position: "relative",
        }}
      >
        <Button
          type="link"
          style={{ position: "absolute", top: 5, left: -5 }}
          onClick={() => navigate(Routes.RestoreAccess)}
        >
          <ArrowBackIcon />
        </Button>

        <Title
          level={2}
          style={{
            textTransform: "uppercase",
            fontWeight: 700,
            padding: 0,
            margin: 0,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          Готово
        </Title>
        <Text
          style={{
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          Отправили новый пароль на вашу почту
        </Text>

        <Flex justify="center" style={{ marginBottom: 18 }}>
          <MailIcon />
        </Flex>

        <Button
          size="large"
          type="primary"
          style={{ textTransform: "uppercase" }}
          onClick={() => navigate(Routes.Auth)}
        >
          войти с новым паролем
        </Button>
      </Flex>
    </Flex>
  );
}
