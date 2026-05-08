import reducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

// Получаем начальное состояние, вызвав редьюсер без аргументов
const initialState = reducer(undefined, { type: '' });

const mockItems: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

test('pending: loading = true', () => {
  const state = reducer(initialState, fetchIngredients.pending(''));
  expect(state.loading).toBe(true);
  expect(state.error).toBeNull();
});

test('fulfilled: items записываются, loading = false', () => {
  const state = reducer(
    initialState,
    fetchIngredients.fulfilled(mockItems, '')
  );
  expect(state.loading).toBe(false);
  expect(state.items).toEqual(mockItems);
});

test('rejected: ошибка записывается, loading = false', () => {
  const state = reducer(
    initialState,
    fetchIngredients.rejected(new Error('Ошибка'), '')
  );
  expect(state.loading).toBe(false);
  expect(state.error).toBe('Ошибка');
});
