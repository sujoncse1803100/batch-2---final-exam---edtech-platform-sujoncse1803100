import { apiSlice } from "../api/apiSlice";

export const AssginmentsMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssginmentsMark: builder.query({
      query: () => `/assignmentMark`,
      providesTags: ["AssginmentsMark"],
    }),

    addAssginmentsMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssginmentsMark"],
    }),

    updateAssginmentsMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AssginmentsMark"],
    }),

    deleteAssginmentsMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AssginmentsMark"],
    }),
  }),
});

export const {
  useGetAllAssginmentsMarkQuery,
  useAddAssginmentsMarkMutation,
  useDeleteAssginmentsMarkMutation,
  useUpdateAssginmentsMarkMutation,
} = AssginmentsMarkApi;
