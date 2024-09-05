import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { server } from "@/config";
// prepareHeaders:(headers,{})=> headers.set('Access-Control-Allow-Origin', '*')
export const clientApi = createApi({
    reducerPath:"clientApi",
    baseQuery: fetchBaseQuery({baseUrl: server ,credentials: "include"}),
    tagTypes:["client"],
    endpoints: (builder) => ({
        addClient:  builder.mutation({
            query:(data)=>({
                 url:`/clients`,
                 method:"POST",
                 body: data
            }),
            invalidatesTags:["client"]
        }),
        getClients: builder.query({
            query:()=>`/clients`,
            providesTags:["client"]
        })
    })
})

export const {useAddClientMutation, useGetClientsQuery} = clientApi