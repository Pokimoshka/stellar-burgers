import { RootState } from '../store';

export const getIngredients = (state: RootState) => state.ingredients.items;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const getIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const getConstructorBurger = (state: RootState) =>
  state.constructorBurger;
export const getConstructorItems = (state: RootState) =>
  state.constructorBurger;

export const getOrderModalData = (state: RootState) =>
  state.orders.currentOrder;
export const getOrderLoading = (state: RootState) => state.orders.loading;
export const getOrderError = (state: RootState) => state.orders.error;

export const getFeedOrders = (state: RootState) => state.feed.feedOrders;
export const getUserOrders = (state: RootState) => state.feed.userOrders;
export const getFeedTotal = (state: RootState) => state.feed.total;
export const getFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const getFeedLoading = (state: RootState) => state.feed.loading;
export const getFeedError = (state: RootState) => state.feed.error;

export const getUser = (state: RootState) => state.user.user;
export const getUserLoading = (state: RootState) => state.user.loading;
export const getUserError = (state: RootState) => state.user.error;
export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;

export const getCurrentOrder = (state: RootState) => state.feed.currentOrder;

export { getBuns, getMains, getSauces } from './ingredients';
