import { apiSlice } from "../api/apiSlice";
import { getVideos } from "./videoSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    updateVideo: builder.mutation({
      query: (data) => ({
        url: `/videos/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    deleteVideo: builder.mutation({
      query: ({ id }) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
    getAllVideo: builder.query({
      query: () => `/videos`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getVideos(result.data));
        } catch (err) {}
      },
      providesTags: ["videos"],
    }),
  }),
});

export const {
  useGetAllVideoQuery,
  useDeleteVideoMutation,
  useAddVideoMutation,
  useUpdateVideoMutation,
} = videosApi;
