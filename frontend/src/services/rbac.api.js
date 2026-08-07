import { api } from ".";

export const rbacApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Roles
    getRoles: builder.query({
      query: () => "/rbac/roles",
      providesTags: ["Roles"],
    }),

    getRole: builder.query({
      query: (id) => `/rbac/roles/${id}`,
      providesTags: ["Roles"],
    }),

    createRole: builder.mutation({
      query: (body) => ({
        url: "/rbac/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),

    // Permissions
    getPermissions: builder.query({
      query: () => "/rbac/permissions",
      providesTags: ["Permissions"],
    }),

    createPermission: builder.mutation({
      query: (body) => ({
        url: "/rbac/permissions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Permissions"],
    }),

    // Assign Permissions
    assignPermissions: builder.mutation({
      query: ({ roleId, ...body }) => ({
        url: `/rbac/roles/${roleId}/permissions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles", "Permissions"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,

  useGetPermissionsQuery,
  useCreatePermissionMutation,

  useAssignPermissionsMutation,
} = rbacApi;
