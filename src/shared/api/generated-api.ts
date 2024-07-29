import { emptyApi as api } from "./empty-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<
      ResetPasswordApiResponse,
      ResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/reset-password`,
        method: "POST",
        body: queryArg.passwordResetConfirmation,
      }),
    }),
    requestPasswordReset: build.mutation<
      RequestPasswordResetApiResponse,
      RequestPasswordResetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/request-password-reset`,
        method: "POST",
        body: queryArg.passwordResetRequest,
      }),
    }),
    signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/auth/register`,
        method: "POST",
        body: queryArg.signUpRequest,
      }),
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/auth/refresh-token`,
        method: "POST",
        body: queryArg.refreshTokenRequest,
      }),
    }),
    signIn: build.mutation<SignInApiResponse, SignInApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: queryArg.signInRequest,
      }),
    }),
    sayHello: build.query<SayHelloApiResponse, SayHelloApiArg>({
      query: () => ({ url: `/api/hello` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type ResetPasswordApiResponse =
  /** status 200 Password successfully reset */ PasswordResetResponse;
export type ResetPasswordApiArg = {
  passwordResetConfirmation: PasswordResetConfirmation;
};
export type RequestPasswordResetApiResponse =
  /** status 200 Password reset email sent */ PasswordResetRequestResponse;
export type RequestPasswordResetApiArg = {
  passwordResetRequest: PasswordResetRequest;
};
export type SignUpApiResponse =
  /** status 200 Successful registration */ AuthResponse;
export type SignUpApiArg = {
  signUpRequest: SignUpRequest;
};
export type RefreshTokenApiResponse =
  /** status 200 Successfully refreshed token */ AuthResponse;
export type RefreshTokenApiArg = {
  refreshTokenRequest: RefreshTokenRequest;
};
export type SignInApiResponse =
  /** status 200 Successful authentication */ AuthResponse;
export type SignInApiArg = {
  signInRequest: SignInRequest;
};
export type SayHelloApiResponse = /** status 200 OK */ string;
export type SayHelloApiArg = void;
export type PasswordResetResponse = {
  /** Message confirming the password was reset */
  message?: string;
};
export type PasswordResetConfirmation = {
  /** Token received in the password reset email */
  token?: string;
  /** New password */
  newPassword?: string;
};
export type PasswordResetRequestResponse = {
  /** Message confirming the password reset email was sent */
  message?: string;
};
export type PasswordResetRequest = {
  /** User's email address */
  email?: string;
};
export type AuthResponse = {
  /** Access token */
  accessToken?: string;
  /** Refresh token */
  refreshToken?: string;
};
export type SignUpRequest = {
  /** User's email address */
  email?: string;
  /** User's password */
  password?: string;
};
export type RefreshTokenRequest = {
  /** Refresh token */
  refreshToken?: string;
};
export type SignInRequest = {
  /** User's email address */
  email?: string;
  /** User's password */
  password?: string;
};
export const {
  useResetPasswordMutation,
  useRequestPasswordResetMutation,
  useSignUpMutation,
  useRefreshTokenMutation,
  useSignInMutation,
  useSayHelloQuery,
} = injectedRtkApi;
