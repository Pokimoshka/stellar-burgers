import { configureStore, combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';

// Корневой редьюсер (нужен для тестов)
export const rootReducer = combineReducers({
  constructorBurger: constructorReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer,
  feed: feedReducer
});

// Создание стора
const store = configureStore({
  reducer: rootReducer
});

// Типы (необходимы для useSelector и useDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
