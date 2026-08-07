import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "../hooks/config";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: "include",
  }),
  tagTypes: [
    "Auth",
    "Users",
    "Patients",
    "AuditLogs",
    "Roles",
    "Permissions",
    "Whatsapp",
  ],
  endpoints: () => ({}),
});
