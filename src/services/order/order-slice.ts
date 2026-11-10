import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@utils/api';

import type { TOrder } from '@utils/types';

type TOrderState = {
  item: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  item: null,
  isLoading: false,
  error: null,
};

export const placeOrder = createAsyncThunk('order/placeOrder', createOrder);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.item = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка при создании заказа';
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
