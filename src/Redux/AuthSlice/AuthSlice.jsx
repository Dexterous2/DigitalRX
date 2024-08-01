import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const AuthSlice = createApi({
  reducerPath: "AuthSlice",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
    }),

    register: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: data,
        };
      },
    }),

    getUserProfile: builder.query({
      query: (userID) => {
        return {
          url: `/auth/get_user_profile/${userID}`,
          method: "GET",
        };
      },
    }),

    getAllUserProfile: builder.query({
      query: (AdminID) => {
        return {
          url: `/auth/get_all_users_for_admin/${AdminID}`,
          method: "GET",
        };
      },
    }),

  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserProfileQuery, useGetAllUserProfileQuery } = AuthSlice;

export default AuthSlice;
