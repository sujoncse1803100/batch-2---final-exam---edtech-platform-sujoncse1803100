import { apiSlice } from "../api/apiSlice";

export const getUsers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
  }),
});

export const { useGetUserQuery, useGetAllUserQuery } = getUsers;
