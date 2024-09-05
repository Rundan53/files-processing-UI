import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "@/config";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}`, credentials: "include"}),
    tagTypes:["login"],
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: (endPoint) => `/auth/${endPoint}`,
            providesTags:["login"],
        }),
        loginUser: builder.mutation({
            query:(data)=>({
                 url:`/auth/login`,
                 method:"POST",
                 body: data
            }),
            invalidatesTags:["login"]
        })
    })
})

export const { useGetUserDataQuery, useLoginUserMutation } = authApi