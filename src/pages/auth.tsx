import { Button, Checkbox, Flex, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import wallpaperUrl from "../assets/wallpaper.jpeg";
import { Routes } from "../shared/routes";
import { theme } from "../shared/ui/theme";

const { Title, Link, Text } = Typography;

export default function AuthPage() {
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
        style={{ padding: 32, backgroundColor: theme.colors.white, width: 388 }}
      >
        <Title
          level={2}
          style={{
            textTransform: "uppercase",
            fontWeight: 700,
            padding: 0,
            margin: 0,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Войдите в аккаунт
        </Title>

        <Input
          type="email"
          size="large"
          placeholder="Email"
          style={{ marginBottom: 12 }}
        />

        <Input.Password
          size="large"
          type="password"
          placeholder="Пароль"
          style={{ marginBottom: 20 }}
        />

        <Flex
          align="center"
          justify="space-between"
          style={{ marginBottom: 40 }}
        >
          <Checkbox>Запомнить меня</Checkbox>

          <Link
            onClick={() => navigate(Routes.RestoreAccess)}
            style={{ color: theme.colors.gray, fontSize: 12 }}
          >
            Забыли пароль?
          </Link>
        </Flex>

        <Button
          size="large"
          type="primary"
          style={{ marginBottom: 18, textTransform: "uppercase" }}
        >
          Войти
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
