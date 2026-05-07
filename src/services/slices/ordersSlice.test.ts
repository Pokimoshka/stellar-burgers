import reducer, { createOrder } from './ordersSlice';

// Начальное состояние из редьюсера
const initialState = reducer(undefined, { type: '' });

test('pending: loading = true', () => {
  const state = reducer(initialState, createOrder.pending('', ['1']));
  expect(state.loading).toBe(true);
});

test('fulfilled: заказ записывается, loading = false', () => {
  const order = {
    _id: '1',
    number: 12345,
    name: 'Бургер',
    ingredients: [],
    status: 'done',
    createdAt: '',
    updatedAt: ''
  };
  const state = reducer(initialState, createOrder.fulfilled(order, '', ['1']));
  expect(state.loading).toBe(false);
  expect(state.currentOrder).toEqual(order); // ← используем реальное имя поля
});

test('rejected: ошибка, loading = false', () => {
  const state = reducer(
    initialState,
    createOrder.rejected(new Error('Ошибка'), '', ['1'])
  );
  expect(state.loading).toBe(false);
  expect(state.error).toBe('Ошибка');
});
