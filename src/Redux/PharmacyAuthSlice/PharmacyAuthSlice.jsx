import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";
import { BsCheckLg } from "react-icons/bs";

const PharmacyAuthSlice = createApi({
    reducerPath: "PharmacyAuthSlice",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["updateProfile", "updateStatus"],
    endpoints: (builder) => ({

        loginPharmacy: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/login_pharmacy`,
                    method: "POST",
                    body: data
                };
            },
        }),

        registerPharmacy: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/register_pharmacy`,
                    method: "POST",
                    body: data
                };
            },
        }),

        forgetpassPharmacy: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/forgot_password_pharmacy`,
                    method: "POST",
                    body: data
                }
            }
        }),

        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/verify_pharmacy`,
                    method: "POST",
                    body: data
                }
            }
        }),

        resetPass: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/reset_password_pharmacy`,
                    method: "POST",
                    body: data
                }
            }
        }),

        resendOtp: builder.mutation({
            query: (data) => {
                return {
                    url: `/pharmacy/resend_otp_pharmacy`,
                    method: "POST",
                    body: data
                }
            }
        }),

        getProfileData: builder.query({
            query: (userID) => {
                return {
                    url: `/pharmacy/get_profile_data/${userID}`,
                    method: "GET",
                }
            },
            providesTags: ["updateProfile"]
        }),

        updateProfile: builder.mutation({
            query: ({ userID, data }) => {

                return {
                    url: `/pharmacy/update_pharmacy/${userID}`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["updateProfile"]
        }),

        pharmacyUsers: builder.query({
            query: ({ userID }) => {
                return {
                    url: `/pharmacy/pharmacy_users/${userID}`,
                    method: "GET",
                }
            }
        }),
        pharmacyProfileData: builder.query({
            query: (userID) => {
                return {
                    url: `/pharmacy/get_profile_data/${userID}`,
                    method: "GET",
                }
            }
        }),

        getAllPharmacies: builder.query({
            query: () => {
                return {
                    url: `/pharmacy/get_all_pharmacies`,
                    method: "GET",
                }
            }
        }),

        updatePharmacyStatus: builder.mutation({
            query: ({ userID, pharmacyID, data }) => {
                return {
                    url: `/pharmacy/update_pharmacy_status/${userID}/${pharmacyID}`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["updateStatus"]
        }),

        getPharmacyStatus: builder.query({
            query: (pharmacyID) => {
                return {
                    url: `/pharmacy/get_all_pharmacies_status/${pharmacyID}`,
                    method: "GET",
                }
            },
            providesTags: ["updateStatus"]
        }),

        getPharmacyData: builder.query({
            query: () => {
                return {
                    url: `/pharmacy/get_pharmacy_data_admin`,
                    method: "GET",
                }
            },
            providesTags: ["updateStatus"]
        }),

    }),

})

export const { useRegisterPharmacyMutation, useLoginPharmacyMutation, useForgetpassPharmacyMutation, useOtpVerifyMutation, useResetPassMutation, useResendOtpMutation, useGetProfileDataQuery, useUpdateProfileMutation, usePharmacyUsersQuery, usePharmacyProfileDataQuery, useGetAllPharmaciesQuery, useUpdatePharmacyStatusMutation, useGetPharmacyStatusQuery, useGetPharmacyDataQuery } = PharmacyAuthSlice;

export default PharmacyAuthSlice;