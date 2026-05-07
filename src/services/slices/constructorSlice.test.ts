import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  clearConstructor
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: '1',
  type: 'bun',
  name: 'Булка',
  price: 100,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main: TIngredient = {
  _id: '2',
  type: 'main',
  name: 'Котлета',
  price: 200,
  proteins: 2,
  fat: 2,
  carbohydrates: 2,
  calories: 200,
  image: '',
  image_mobile: '',
  image_large: ''
};

// helper для создания ConstructorIngredient
const toConstructor = (
  ing: TIngredient,
  id: string
): TConstructorIngredient => ({ ...ing, id });
const toConstructorBun = (
  ing: TIngredient,
  id: string
): Required<TConstructorIngredient> => ({ ...ing, id });

test('добавление булки', () => {
  const state = reducer(undefined, addIngredient(bun));
  expect(state.bun).toBeTruthy();
  expect(state.bun!.name).toBe('Булка');
  expect(state.bun!.id).toBeDefined();
});

test('добавление начинки', () => {
  const state = reducer(undefined, addIngredient(main));
  expect(state.ingredients).toHaveLength(1);
  expect(state.ingredients[0].name).toBe('Котлета');
  expect(state.ingredients[0].id).toBeDefined();
});

test('удаление начинки по id', () => {
  const stateWith = {
    bun: null,
    ingredients: [toConstructor(main, '123')]
  };
  const state = reducer(stateWith, removeIngredient('123'));
  expect(state.ingredients).toHaveLength(0);
});

test('перемещение начинки вверх', () => {
  const initial = {
    bun: null,
    ingredients: [
      toConstructor({ ...main, name: 'A' }, '1'),
      toConstructor({ ...main, name: 'B' }, '2')
    ]
  };
  const state = reducer(initial, moveIngredientUp(1));
  expect(state.ingredients[0].name).toBe('B');
  expect(state.ingredients[1].name).toBe('A');
});

test('очистка конструктора', () => {
  const state = reducer(
    {
      bun: toConstructorBun(bun, 'bun-id'),
      ingredients: [toConstructor(main, '123')]
    },
    clearConstructor()
  );
  expect(state.bun).toBeNull();
  expect(state.ingredients).toHaveLength(0);
});
