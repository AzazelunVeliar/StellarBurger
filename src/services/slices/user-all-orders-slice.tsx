import { getOrdersApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk('orders/ofUser', getOrdersApi);

interface UserOrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error?: string;
}

const initialState: UserOrdersState = {
  orders: [],
  isLoading: true,
  error: undefined
};

const setPending = (state: UserOrdersState) => {
  state.isLoading = true;
  state.error = undefined;
};

const setFulfilled = (
  state: UserOrdersState,
  action: PayloadAction<TOrder[]>
) => {
  state.orders = action.payload;
  state.isLoading = false;
};

const setRejected = (state: UserOrdersState) => {
  state.isLoading = false;
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, setPending)
      .addCase(getUserOrders.fulfilled, setFulfilled)
      .addCase(getUserOrders.rejected, setRejected);
  },
  selectors: {
    listOfOrders: (state) => state.orders
  }
});

export const { listOfOrders } = userOrdersSlice.selectors;
