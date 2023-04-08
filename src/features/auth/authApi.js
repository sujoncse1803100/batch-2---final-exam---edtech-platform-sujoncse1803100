import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const studentLoginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = {
            accessToken: result.data.accessToken,
            user: result.data.user,
          };
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(userLoggedIn(user));
        } catch (err) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = studentLoginApi;
