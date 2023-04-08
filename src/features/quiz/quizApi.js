import { apiSlice } from "../api/apiSlice";

export const quizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuiz: builder.query({
      query: () => `/quizzes`,
      providesTags: ["Quizes"],
    }),

    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizes"],
    }),

    updateQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Quizes"],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizes"],
    }),
  }),
});

export const {
  useGetAllQuizQuery,
  useDeleteQuizMutation,
  useAddQuizMutation,
  useUpdateQuizMutation,
} = quizesApi;
