import { emptyApi as api } from "./empty-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getData2022: build.query<GetData2022ApiResponse, GetData2022ApiArg>({
      query: () => ({ url: `/api/data/2022` }),
    }),
    getData2021: build.query<GetData2021ApiResponse, GetData2021ApiArg>({
      query: () => ({ url: `/api/data/2021` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
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
export type GetData2022ApiResponse =
  /** status 200 Успешное получение данных за 2022 год */ Agrochem2022View[];
export type GetData2022ApiArg = void;
export type GetData2021ApiResponse =
  /** status 200 Успешное получение данных за 2021 год */ Agrochem2021View[];
export type GetData2021ApiArg = void;
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
export type Agrochem2022View = {
  /** Идентификатор записи */
  id?: string;
  /** Название региона */
  regionName?: string;
  /** Подвижный фосфор, мг/кг */
  availablePhosphorus?: string;
  /** Подвижный калий, мг/кг */
  availablePotassium?: string;
  /** рН солевой вытяжки, ед рН */
  phSaltExtract?: string;
  /** Гумус, % */
  humus?: string;
  /** Урожайность зерновых, центнера/га */
  grainYield?: string;
  /** Урожайность картофеля, тонны/га */
  potatoYield?: string;
  /** Урожайность подсолнечника, тонны/га */
  sunflowerYield?: string;
  /** Урожайность овощей открытого грунта, тонны/га */
  vegetableYield?: string;
  /** СРУП, руб/кв.м */
  srup?: string;
  /** Градация почв с учетом агрохим показателей */
  soilGrade?: string;
};
export type Agrochem2021View = {
  /** Идентификатор записи */
  id?: string;
  /** Название региона */
  regionName?: string;
  /** Обследованная площадь, тыс. га */
  surveyedArea?: string;
  /** Подвижный фосфор, мг/кг */
  availablePhosphorus?: string;
  /** Подвижный калий, мг/кг */
  availablePotassium?: string;
  /** рН солевой вытяжки, ед рН */
  phSaltExtract?: string;
  /** Гумус, % */
  humus?: string;
};
export const {
  useRequestPasswordResetMutation,
  useSignUpMutation,
  useRefreshTokenMutation,
  useSignInMutation,
  useGetData2022Query,
  useGetData2021Query,
} = injectedRtkApi;
