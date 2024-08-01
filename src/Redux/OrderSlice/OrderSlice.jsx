import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const OrderSlice = createApi({
    reducerPath: "OrderSlice",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes:["updateProfile", "updateStatus"],
    endpoints: (builder) => ({
        getOrdersByPharmacy: builder.query({
            query: (pharmacyID) => {
                return {
                    url: `/order/get_orders_by_pharmacy/${pharmacyID}`,
                    method: "GET",
                }
            },
            providesTags:["updateStatus"]
        }),

        createOrder: builder.mutation({
            query: ({user_id, data}) => {
                // console.log(data);
                return {
                    url: `/order/create_order/${user_id}`,
                    method: "POST",
                    body: data
                }
            },
        }),

        aidAvalaibleOrNotByPharmacy: builder.mutation({
            query: ({phrma_id, order_id, data}) => {
                // console.log(data);
                return {
                    url: `/order/aid_avalaible_or_not_by_pharmacy/${phrma_id}/${order_id}`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags:["updateStatus"]
        }),

        changeOrderStatus: builder.mutation({
            query: ({phrma_id, order_id, data}) => {
                return {
                    url: `/order/change_order_status/${phrma_id}/${order_id}`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags:["updateStatus"]
        }),

        getOrdersByUser: builder.query({
            query: (user_id) => {
   
                return {
                    url: `/order/get_orders_by_user/${user_id}`,
                    method: "GET",
                }
            },
            invalidatesTags:["updateStatus"]
        }),

        getAllOrdersAdmin: builder.query({
            query: (adminId) => {
                return {
                    url: `/order/get_all_orders_admin/${adminId}`,
                    method: "GET",
                }
            }
        }),

    }),
})

export const { useGetOrdersByPharmacyQuery, useCreateOrderMutation, useAidAvalaibleOrNotByPharmacyMutation, useChangeOrderStatusMutation, useGetOrdersByUserQuery, useGetAllOrdersAdminQuery } = OrderSlice;

export default OrderSlice;