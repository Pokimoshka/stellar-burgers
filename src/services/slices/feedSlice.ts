import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface FeedState {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null; // для прямого просмотра
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feedOrders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);
export const fetchUserOrders = createAsyncThunk(
  'feed/fetchUserOrders',
  getOrdersApi
);
export const fetchOrderByNumber = createAsyncThunk(
  'feed/fetchOrder',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearCurrentOrder } = feedSlice.actions;
export default feedSlice.reducer;
