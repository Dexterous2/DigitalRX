import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";
import { BsCheckLg } from "react-icons/bs";

const SubscriptionSlice = createApi({
    reducerPath: "SubscriptionSlice",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["updatePkg", "updateStatus", "cancelSubscription"],
    endpoints: (builder) => ({

        createSubscription: builder.mutation({
            query: (data) => {
                return {
                    url: `/subscription/create-subscription`,
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["updatePkg"]
        }),

        getSubscription: builder.query({
            query: () => {
                return {
                    url: `/subscription/get-subscription`,
                    method: "GET"
                };
            },
            providesTags: ["updatePkg", "updateStatus", "cancelSubscription"]
        }),

        selectSubcription: builder.mutation({
            query: ({ pharmacyid, subscription_id }) => {
                return {
                    url: `/subscription/select_and_apply_subcription/${pharmacyid}/${subscription_id}`,
                    method: "POST",
                };
            },
        }),

        updateSubscriptionStatus: builder.mutation({
            query: ({ user_id, package_id, data }) => {
                return {
                    url: `/subscription/${user_id}/update-subscription-status/${package_id}`,
                    method: "PATCH",
                    body: data
                };
            },
            invalidatesTags: ["updateStatus"]
        }),

        cancelSubscription: builder.mutation({
            query: ({ pharmacyId, subscriptionId }) => {
                return {
                    url: `/subscription/${pharmacyId}/cancel-subscription/${subscriptionId}`,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["cancelSubscription"]
        }),

    }),

})

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery, useSelectSubcriptionMutation, useUpdateSubscriptionStatusMutation, useCancelSubscriptionMutation } = SubscriptionSlice;

export default SubscriptionSlice;