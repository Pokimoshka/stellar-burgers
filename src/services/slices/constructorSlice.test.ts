import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';

// Моковые данные с id (id будет перегенерирован редьюсером, но для типа нужен)
const bun: TConstructorIngredient = {
  _id: 'bun_1',
  name: 'Bun',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  id: 'bun_1_id'  // любое, редьюсер заменит
};

const ingredientA: TConstructorIngredient = {
  _id: 'main_1',
  name: 'Ingredient A',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  id: 'ing_A_id'
};

const ingredientB: TConstructorIngredient = {
  _id: 'main_2',
  name: 'Ingredient B',
  type: 'main',
  proteins: 12,
  fat: 6,
  carbohydrates: 22,
  calories: 110,
  price: 60,
  image: '',
  image_mobile: '',
  image_large: '',
  id: 'ing_B_id'
};

const initialState = { bun: null, ingredients: [] };

describe('constructorSlice', () => {
  it('добавляет булку (тип bun) – заменяет предыдущую', () => {
    const state = constructorReducer(initialState, addIngredient(bun));
    // проверяем, что булка добавилась, игнорируя id
    expect(state.bun).toMatchObject({
      _id: bun._id,
      name: bun.name,
      type: bun.type
    });
    expect(state.bun).toHaveProperty('id');

    const newBun = { ...bun, _id: 'bun_2', name: 'New Bun', id: 'bun_2_id' };
    const state2 = constructorReducer(state, addIngredient(newBun));
    expect(state2.bun).toMatchObject({
      _id: newBun._id,
      name: newBun.name,
      type: newBun.type
    });
    expect(state2.bun).toHaveProperty('id');
  });

  it('добавляет начинку в массив ingredients', () => {
    const state = constructorReducer(initialState, addIngredient(ingredientA));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: ingredientA._id,
      name: ingredientA.name,
      type: ingredientA.type
    });
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('удаляет ингредиент по id', () => {
    // сначала добавим, чтобы получить актуальный id
    let state = constructorReducer(initialState, addIngredient(ingredientA));
    const idToRemove = state.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиент вверх', () => {
    const state = {
      bun: null,
      ingredients: [ingredientA, ingredientB]
    };
    const action = moveIngredientUp(1);
    const newState = constructorReducer(state, action);
    expect(newState.ingredients[0]._id).toBe(ingredientB._id);
    expect(newState.ingredients[1]._id).toBe(ingredientA._id);
  });

  it('перемещает ингредиент вниз', () => {
    const state = {
      bun: null,
      ingredients: [ingredientA, ingredientB]
    };
    const action = moveIngredientDown(0);
    const newState = constructorReducer(state, action);
    expect(newState.ingredients[0]._id).toBe(ingredientB._id);
    expect(newState.ingredients[1]._id).toBe(ingredientA._id);
  });

  it('не ломается при попытке переместить первый элемент вверх', () => {
    const state = {
      bun: null,
      ingredients: [ingredientA, ingredientB]
    };
    const action = moveIngredientUp(0);
    const newState = constructorReducer(state, action);
    expect(newState.ingredients).toEqual(state.ingredients);
  });

  it('не ломается при попытке переместить последний элемент вниз', () => {
    const state = {
      bun: null,
      ingredients: [ingredientA, ingredientB]
    };
    const action = moveIngredientDown(1);
    const newState = constructorReducer(state, action);
    expect(newState.ingredients).toEqual(state.ingredients);
  });

  it('очищает конструктор', () => {
    const filledState = {
      bun: bun,
      ingredients: [ingredientA, ingredientB]
    };
    const state = constructorReducer(filledState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});