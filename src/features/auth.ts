import { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { SignInResponse, sessionStore } from "../entities/session";
import { ResponseErrorStatus, useAppDispatch } from "../shared/lib";

export const useIsSingIn = (): boolean => {
  return useSelector(sessionStore.selectors.isSignIn);
};

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResult {
  error?: {
    text: string;
  };
}

export const useSignIn = () => {
  const dispatch = useAppDispatch();

  return async (data: SignInData): Promise<SignInResult> => {
    const { payload } = (await dispatch(
      sessionStore.actions.signIn({
        email: data.email,
        password: data.password,
      })
    )) as PayloadAction<SignInResponse>;

    if (payload.error) {
      switch (payload.error.status) {
        case ResponseErrorStatus.BadRequest:
          return {
            error: {
              text: "Неверная почта или пароль",
            },
          };

        default:
          return {
            error: {
              text: "Что-то пошло не так...",
            },
          };
      }
    }

    return {};
  };
};
