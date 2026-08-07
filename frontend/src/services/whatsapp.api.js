import { api } from ".";

export const whatsappApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendTemplateMessage: builder.mutation({
      query: (data) => ({
        url: "/whatsapp/send-template",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Whatsapp"],
    }),
  }),
});

export const { useSendTemplateMessageMutation } = whatsappApi;
