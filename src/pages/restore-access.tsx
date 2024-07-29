import { Button, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import wallpaperUrl from "../assets/wallpaper.jpeg";
import {
  RequestPasswordResetData,
  useRequestPasswordReset,
} from "../features/auth";
import { Routes } from "../shared/routes";
import { ArrowBackIcon } from "../shared/ui/arrow-back-icon";
import { theme } from "../shared/ui/theme";

const { Title, Link, Text } = Typography;

export default function RestoreAccessPage() {
  const navigate = useNavigate();

  const { reset } = useRequestPasswordReset();

  const [error, setError] = useState<undefined | string>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RequestPasswordResetData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: RequestPasswordResetData) => {
    const response = await reset(data.email);

    if (response.error) {
      setError(response.error.text);
      return;
    }

    navigate(Routes.RestoreAccessSuccess);
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
              textAlign: "center",
            }}
          >
            На указанную почту придет письмо с новым паролем
          </Text>

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
                style={{ marginBottom: 24 }}
              />
            )}
          />

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
            type="primary"
            htmlType="submit"
            disabled={!isValid}
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
      </Form>
    </Flex>
  );
}
