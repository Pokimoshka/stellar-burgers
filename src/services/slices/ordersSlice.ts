import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrdersState {
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  currentOrder: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    // Добавляем недостающее поле ingredients, чтобы соответствовать TOrder
    return { ...data.order, ingredients: [] } as TOrder;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { resetOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
