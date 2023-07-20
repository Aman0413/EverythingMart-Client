import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosClient";
import toast from "react-hot-toast";

//get all orders
export const getAllOrders = createAsyncThunk("getAllOrders", async () => {
  const res = await axios.get("/admin/getAllOrders");
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    //get all orders
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error.message;
      state.loading = false;
      console.log(action.error.message);
    });
  },
});

export default orderSlice.reducer;
