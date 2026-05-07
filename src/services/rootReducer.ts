import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice'; // если есть

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  orders: ordersReducer,
  user: userReducer,
  feed: feedReducer // если есть
});
