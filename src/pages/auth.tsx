import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import wallpaperUrl from "../assets/wallpaper.jpeg";
import { SignInData, useSignIn } from "../features/auth";
import { Routes } from "../shared/routes";
import { theme } from "../shared/ui/theme";

const { Title, Link, Text } = Typography;

export default function AuthPage() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [error, setError] = useState<undefined | string>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInData) => {
    const { error } = await signIn(data);

    if (error) {
      setError(error.text);
      return;
    }

    setError(undefined);
    navigate(Routes.Rating);
  };

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
      <Form onSubmitCapture={handleSubmit(onSubmit)}>
        <Flex
          vertical
          style={{
            padding: 32,
            backgroundColor: theme.colors.white,
            width: 388,
          }}
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
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="email"
                size="large"
                placeholder="Email"
                onChange={onChange}
                value={value}
                style={{ marginBottom: 12 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input.Password
                size="large"
                type="password"
                placeholder="Пароль"
                onChange={onChange}
                value={value}
                style={{ marginBottom: 20 }}
              />
            )}
          />
          <Flex
            align="center"
            justify="space-between"
            style={{ marginBottom: 24 }}
          >
            <Checkbox>Запомнить меня</Checkbox>

            <Link
              onClick={() => navigate(Routes.RestoreAccess)}
              style={{ color: theme.colors.gray, fontSize: 12 }}
            >
              Забыли пароль?
            </Link>
          </Flex>

          <Text
            style={{
              visibility: error ? "visible" : "hidden",
              color: theme.colors.error,
              fontSize: theme.font.text.size,
              fontWeight: 400,
              lineHeight: "14px",
              height: 14,
              marginBottom: 4,
            }}
          >
            {error ?? " "}
          </Text>

          <Button
            size="large"
            type={"primary"}
            disabled={!isValid}
            htmlType="submit"
            style={{ marginBottom: 18, textTransform: "uppercase" }}
          >
            Войти
          </Button>
          <Text style={{ color: theme.colors.gray, fontSize: 12 }}>
            Нет аккаунта? Вы можете{" "}
            <Link
              href={"https://main.agvision.ru"}
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
      </Form>
    </Flex>
  );
}
