import { api } from ".";

export const patientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get Patients List
    getPatients: builder.query({
      query: ({
        search,
        status,
        visitType,
        page,
        pageSize,
        sortBy,
        sortDir,
      }) => ({
        url: "/patients",
        params: {
          search,
          status,
          visitType,
          page,
          pageSize,
          sortBy,
          sortDir,
        },
      }),

      providesTags: ["Patients"],
    }),

    // Get Single Patient
    getPatient: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: ["Patients"],
    }),

    // Create Patient
    createPatient: builder.mutation({
      query: (body) => ({
        url: "/patients",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Patients"],
    }),

    // Update Patient
    updatePatient: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Patients"],
    }),

    // Delete Patient
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Patients"],
    }),

    // Create Visit
    createVisit: builder.mutation({
      query: ({ patientId, ...body }) => ({
        url: `/patients/${patientId}/visits`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Patients"],
    }),

    // Resend WhatsApp Feedback
    resendWhatsapp: builder.mutation({
      query: (patientId) => ({
        url: `/patients/${patientId}/whatsapp`,
        method: "POST",
      }),

      invalidatesTags: ["Patients"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientQuery,

  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,

  useCreateVisitMutation,
  useResendWhatsappMutation,
} = patientsApi;
