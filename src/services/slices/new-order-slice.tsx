import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

export const newOrder = createAsyncThunk('order/createOrder', orderBurgerApi);

const initialState = {
  orderRequest: false as boolean,
  orderModalData: null as TOrder | null,
  error: undefined as string | undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(newOrder.pending, (state) => {
        state.orderRequest = true;
      });
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});
export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
