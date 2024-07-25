import { Button, Flex, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import wallpaperUrl from "../assets/wallpaper.jpeg";
import { Routes } from "../shared/routes";
import { ArrowBackIcon } from "../shared/ui/arrow-back-icon";
import { theme } from "../shared/ui/theme";

const { Title, Link, Text } = Typography;

export default function RestoreAccessPage() {
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
          onClick={() => navigate(Routes.Auth)}
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
          Восстановление доступа
        </Title>
        <Text
          style={{
            marginBottom: 22,
          }}
        >
          На указанную почту придет письмо с новым паролем
        </Text>
        <Input
          type="email"
          size="large"
          placeholder="Email"
          style={{ marginBottom: 40 }}
        />
        <Button
          size="large"
          type="primary"
          style={{ marginBottom: 18, textTransform: "uppercase" }}
        >
          Сбросить пароль
        </Button>
        <Text style={{ color: theme.colors.gray, fontSize: 12 }}>
          Нет аккаунта? Вы можете{" "}
          <Link
            href={"https://vsezol.com"}
            style={{
              color: theme.colors.active,
              fontSize: 12,
              textDecoration: "underline",
            }}
          >
            получить доступ к сервису
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
