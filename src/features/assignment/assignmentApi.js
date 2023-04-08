import { apiSlice } from "../api/apiSlice";
// import { getAssignments } from "./assignmentslice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignment: builder.query({
      query: () => `/assignments`,
      providesTags: ["Assignments"],
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),

    updateAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetAllAssignmentQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
