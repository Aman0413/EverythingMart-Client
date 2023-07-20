import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";

export default configureStore({
  reducer: {
    orders: orderReducer,
  },
});
