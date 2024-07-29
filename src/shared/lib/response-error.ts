import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { hasKey } from "./has-key";

export enum ResponseErrorStatus {
  Forbidden,
  BadRequest,
  Unknown,
}

export interface ResponseError {
  status: ResponseErrorStatus;
}

export function toResponseError(
  error: FetchBaseQueryError | SerializedError | undefined
): ResponseError | undefined {
  if (!error) {
    return undefined;
  }

  if (hasKey(error, "status")) {
    switch (error.status) {
      case 403:
        return {
          status: ResponseErrorStatus.Forbidden,
        };
      case 400:
        return {
          status: ResponseErrorStatus.BadRequest,
        };
    }
  }

  return {
    status: ResponseErrorStatus.Unknown,
  };
}
