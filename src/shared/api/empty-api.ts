import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "../lib";

export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HTTP_API_URL,
    prepareHeaders: (headers) => {
      const session = getSession();

      if (session?.accessToken) {
        headers.set("authorization", `Bearer ${session.accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
