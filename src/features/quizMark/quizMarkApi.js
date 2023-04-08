import { apiSlice } from "../api/apiSlice";

export const QuizsMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizsMark: builder.query({
      query: () => `/quizMark`,
      providesTags: ["QuizsMark"],
    }),

    addQuizsMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizsMark"],
    }),

    updateQuizsMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["QuizsMark"],
    }),

    deleteQuizsMark: builder.mutation({
      query: (id) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuizsMark"],
    }),
  }),
});

export const {
  useGetAllQuizsMarkQuery,
  useAddQuizsMarkMutation,
  useDeleteQuizsMarkMutation,
  useUpdateQuizsMarkMutation,
} = QuizsMarkApi;
