import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

const initialState = {
  orders: [] as TOrder[],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined as string | undefined
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders || [];
        state.total = action.payload.total ?? 0;
        state.totalToday = action.payload.totalToday ?? 0;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  },
  selectors: {
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  }
});

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;
