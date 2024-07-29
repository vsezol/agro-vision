import {
  AsyncThunk,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { agroVisionApi } from "../shared/api";
import {
  ResponseError,
  createBaseSelector,
  registerSlice,
  setSession,
  toResponseError,
} from "../shared/lib";

interface SessionState {
  email: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const initialState: SessionState = {
  email: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.email = payload.data?.email;
      state.accessToken = payload.data?.accessToken;
      state.refreshToken = payload.data?.refreshToken;
    });
  },
});

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  data?: {
    email: string;
    accessToken: string;
    refreshToken: string;
  };
  error?: ResponseError;
}

const signIn = createAsyncThunk<SignInResponse, SignInRequest>(
  "session/signIn",
  async ({ email, password }, { dispatch }) => {
    const { data, error } = await dispatch(
      agroVisionApi.endpoints.signIn.initiate({
        signInRequest: { email, password },
      })
    );

    if (!error) {
      const accessToken = data.accessToken!;
      const refreshToken = data.accessToken!;

      setSession({
        accessToken,
        refreshToken,
      });

      return {
        data: {
          email,
          accessToken,
          refreshToken,
        },
      };
    }

    return {
      error: toResponseError(error),
    };
  }
);

registerSlice([sessionSlice]);

const baseSelector = createBaseSelector(sessionSlice);

const isSignIn = createSelector(baseSelector, (state) => Boolean(state.email));

export interface SessionStore {
  actions: {
    signIn: AsyncThunk<SignInResponse, SignInRequest, object>;
  };
  selectors: {
    isSignIn: typeof isSignIn;
  };
}

export const sessionStore: SessionStore = {
  actions: {
    signIn,
  },
  selectors: {
    isSignIn,
  },
};
