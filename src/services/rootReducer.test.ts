import { rootReducer } from './store';
import store from './store';

test('rootReducer возвращает начальное состояние при UNKNOWN_ACTION', () => {
  const initialState = store.getState();
  const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(state).toEqual(initialState);
});
