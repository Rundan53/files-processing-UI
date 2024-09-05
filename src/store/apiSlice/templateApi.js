import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config/default.json";
import { server } from "@/config";
import axios from "axios";
import { formateDate } from "@/utils/formateDate";
// prepareHeaders:(headers,{})=> headers.set('Access-Control-Allow-Origin', '*')
export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({ baseUrl: server, credentials: "include" }),
  tagTypes: ["editedTemplates"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (endPoint) => `/categories?type=template`,
    }),
    getTemplatesByCategories: builder.query({
      query: ({ categoryId, type }) =>
        `/templates/category/${categoryId}?type=${type}`,
    }),
    getTemplatesByEvents: builder.query({
      query: ({ eventId, type }) => `/templates/events/${eventId}?type=${type}`,
    }),
    getEventsByDate: builder.query({
      query: (date) => `/events?date=${date}`,
    }),
    getClientsTemplates: builder.query({
      query: () => `/drafts`,
      providesTags: ["editedTemplates"],
    }),
    getClientsTemplateSpecific: builder.query({
      query: (draftId) => `/drafts/${draftId}`,
      providesTags: ["editedTemplates"],
    }),
    sendEditedTemplate: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/drafts",
        body: data,
      }),
      invalidatesTags: ["editedTemplates"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetTemplatesByCategoriesQuery,
  useLazyGetTemplatesByCategoriesQuery,
  useLazyGetEventsByDateQuery,
  useGetTemplatesByEventsQuery,
  useSendEditedTemplateMutation,
  useGetClientsTemplatesQuery,
  useGetClientsTemplateSpecificQuery,
} = templateApi;
