import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const PaymnetSlice = createApi({
    reducerPath: "PaymnetSlice",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["updateCardDetail"],
    endpoints: (builder) => ({
        createCard: builder.mutation({
            query: ({userID, data}) => {
                return {
                    url: `/payment-card/create-card/${userID}`,
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags:["updateCardDetail"]
        }),

        createDetails: builder.query({
            query: (userID) => {
                return {
                    url: `/payment-card/get-details/${userID}`,
                    method: "GET",
                };
            },
            providesTags:["updateCardDetail"]
        }),

    }),

})

export const { useCreateCardMutation, useCreateDetailsQuery } = PaymnetSlice;

export default PaymnetSlice;