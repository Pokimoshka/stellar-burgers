import { rootReducer } from './store';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';

test('@@INIT возвращает корректное начальное состояние', () => {
  const initAction = { type: '@@INIT' };
  const state = rootReducer(undefined, initAction);
  expect(state).toEqual({
    constructorBurger: constructorReducer(undefined, initAction),
    ingredients: ingredientsReducer(undefined, initAction),
    orders: ordersReducer(undefined, initAction),
    user: userReducer(undefined, initAction),
    feed: feedReducer(undefined, initAction)
  });
});

test('UNKNOWN_ACTION не изменяет состояние', () => {
  const fakeAction = { type: 'UNKNOWN_ACTION' };
  const state = rootReducer(undefined, fakeAction);
  expect(state).toEqual({
    constructorBurger: constructorReducer(undefined, fakeAction),
    ingredients: ingredientsReducer(undefined, fakeAction),
    orders: ordersReducer(undefined, fakeAction),
    user: userReducer(undefined, fakeAction),
    feed: feedReducer(undefined, fakeAction)
  });
});