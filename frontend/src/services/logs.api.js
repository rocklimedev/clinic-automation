import { api } from ".";

export const auditLogsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: (params) => ({
        url: "/audit-logs",
        params,
      }),
      providesTags: ["AuditLogs"],
    }),

    getAuditLog: builder.query({
      query: (id) => `/audit-logs/${id}`,
      providesTags: ["AuditLogs"],
    }),

    createAuditLog: builder.mutation({
      query: (body) => ({
        url: "/audit-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AuditLogs"],
    }),

    deleteAuditLog: builder.mutation({
      query: (id) => ({
        url: `/audit-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AuditLogs"],
    }),
  }),
});

export const {
  useGetAuditLogsQuery,
  useGetAuditLogQuery,
  useCreateAuditLogMutation,
  useDeleteAuditLogMutation,
} = auditLogsApi;
