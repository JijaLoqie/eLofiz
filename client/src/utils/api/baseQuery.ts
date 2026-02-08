import type {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

export const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
  // const state = api.getState() as RootState; // Get the state from the API
  // const { gateIp, gatePort } = state.appSettings.network; // Access the necessary state
  const baseUrl = `http://localhost:5173/api`; // Generate the base URL

  return fetchBaseQuery({
    baseUrl
  })(args, api, extraOptions); // Call fetchBaseQuery with the generated base URL
};
