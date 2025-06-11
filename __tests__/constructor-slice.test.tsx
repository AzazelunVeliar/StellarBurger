import {
  addItem,
  clearAll,
  constructorSlice,
  deleteItem
} from '../src/services/slices/constructor-slice';

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
  __v: 0,
  id: '3'
};

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
  __v: 0,
  id: '1'
};

const mockFilling = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  id: '2'
};

const initialState = {
  bun: null,
  ingredients: []
};

describe('Конструктор', () => {
  test('Корректное начальное состояние', () => {
    const state = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  test('Добавление булки', () => {
    const state = constructorSlice.reducer(initialState, addItem(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  test('Добавление ингредиента', () => {
    const state = constructorSlice.reducer(
      initialState,
      addItem(mockFilling)
    );
    expect(state.ingredients).toContainEqual(mockFilling);
  });

  test('Удаление ингредиента', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [mockFilling, mockSauce]
    };
    const state = constructorSlice.reducer(
      filledState,
      deleteItem(mockFilling)
    );
    expect(state.ingredients).not.toContainEqual(mockFilling);
    expect(state.ingredients).toHaveLength(1);
  });

  test('Очистка конструктора', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [mockFilling, mockSauce]
    };
    const state = constructorSlice.reducer(filledState, clearAll());
    expect(state).toEqual(initialState);
  });
});
