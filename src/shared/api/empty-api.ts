import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getSession, setSession } from "../lib";
import { AuthResponse } from "./generated-api";

export const NO_AUTH_HEADER = "AgroVisionNoAuth";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_HTTP_API_URL,
  prepareHeaders: (headers, api) => {
    const isSignIn = api.endpoint === "signIn";

    if (isSignIn) {
      return headers;
    }

    const session = getSession();

    if (headers.get(NO_AUTH_HEADER)) {
      headers.delete(NO_AUTH_HEADER);
      return headers;
    }

    if (session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (!(result.error && result.error.status === 403)) {
    return result;
  }

  const session = getSession();

  const refreshResult = await baseQuery(
    {
      url: "/api/v1/auth/refresh-token",
      method: "POST",
      body: { refreshToken: session?.refreshToken },
      headers: {
        [NO_AUTH_HEADER]: NO_AUTH_HEADER,
      },
    },
    api,
    extraOptions
  );

  if (!refreshResult.data) {
    setSession({ email: "", accessToken: "", refreshToken: "" });
    location.href = "/auth";
    return result;
  }

  const { accessToken, refreshToken } =
    refreshResult.data as Required<AuthResponse>;

  setSession({
    email: session?.email ?? "",
    accessToken: accessToken,
    refreshToken,
  });

  return await baseQuery(args, api, extraOptions);
};

export const emptyApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
