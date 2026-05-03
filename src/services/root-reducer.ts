import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from '../services/slices/constructorSlice';
import ordersReducer from '../services/slices/ordersSlice';
import feedReducer from '../services/slices/feedSlice';
import userReducer from '../services/slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  orders: ordersReducer,
  feed: feedReducer,
  user: userReducer
});
