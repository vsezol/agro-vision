import { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { SignInResponse, sessionStore } from "../entities/session";
import { useRequestPasswordResetMutation } from "../shared/api";
import { ResponseErrorStatus, useAppDispatch } from "../shared/lib";

export const useIsSingIn = (): boolean => {
  return useSelector(sessionStore.selectors.isSignIn);
};

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResult {
  error?: BaseError;
}

interface BaseError {
  text: string;
}

const defaultError: BaseError = {
  text: "Что-то пошло не так...",
};

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
            error: defaultError,
          };
      }
    }

    return {};
  };
};

export interface RequestPasswordResetData {
  email: string;
}

export interface RequestPasswordResetResult {
  error?: BaseError;
}

export const useRequestPasswordReset = () => {
  const [reset] = useRequestPasswordResetMutation();

  return {
    reset: async (email: string): Promise<RequestPasswordResetResult> => {
      const response = await reset({ passwordResetRequest: { email } });

      if (response.error) {
        return {
          error: defaultError,
        };
      }

      return {};
    },
  };
};
