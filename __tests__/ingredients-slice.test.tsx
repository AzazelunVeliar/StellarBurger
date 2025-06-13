import { TIngredient } from '../src/utils/types';
import {
  getIngredientsList,
  ingredientsSlice
} from '../src/services/slices/ingredients-slice';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};
const mockMain = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};
const mockSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const initialState = {
  ingredients: [] as Array<TIngredient>,
  loading: false,
  error: null
};

describe('Список ингредиентов', () => {
  test('Обработка ожидания', () => {
    const action = { type: getIngredientsList.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });
  test('Обработка ошибки при запросе', () => {
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: false, error: 'Error' });
  });
  test('Обработка успешного выполнения запроса', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: [mockBun, mockMain, mockSauce]
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      ingredients: [mockBun, mockMain, mockSauce]
    });
  });
});
