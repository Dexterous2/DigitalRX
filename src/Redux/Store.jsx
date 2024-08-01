import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthSlice from "./AuthSlice/AuthSlice";
import PharmacyAuthSlice from "./PharmacyAuthSlice/PharmacyAuthSlice";
import OrderSlice from "./OrderSlice/OrderSlice";
import PaymnetSlice from "./PaymentSlice/PaymentSlice";
import SubscriptionSlice from "./subscriptionSlice/SubscriptionSlice";
import ThemeSlice from "./themeSlice/themeSlice";


export const store = configureStore({
    reducer: {
        [AuthSlice.reducerPath]: AuthSlice.reducer,
        [PharmacyAuthSlice.reducerPath]: PharmacyAuthSlice.reducer,
        [OrderSlice.reducerPath]: OrderSlice.reducer,
        [PaymnetSlice.reducerPath]: PaymnetSlice.reducer,
        [SubscriptionSlice.reducerPath]: SubscriptionSlice.reducer,
        theme: ThemeSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthSlice.middleware).concat(PharmacyAuthSlice.middleware).concat(OrderSlice.middleware).concat(PaymnetSlice.middleware).concat(SubscriptionSlice.middleware),
});

setupListeners(store.dispatch);
export default store;