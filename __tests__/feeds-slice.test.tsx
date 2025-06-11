import { TOrder } from '../src/utils/types';
import { feedsSlice, getAllFeeds } from '../src/services/slices/feeds-slice';

const mockOrder = {
  success: true,
  total: 10,
  totalToday: 1,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-12-19T22:02:53.949Z',
      updatedAt: '2024-12-19T22:02:54.635Z',
      number: 64444
    }
  ]
};
const initialState = {
  orders: [] as Array<TOrder>,
  total: 0 as number,
  totalToday: 0 as number,
  isLoading: true as boolean,
  error: undefined as string | undefined
};

describe('Лента заказов', () => {
  test('Корректное начальное состояние', () => {
    const state = feedsSlice.reducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('Обработка ожидания ответа', () => {
    const action = { type: getAllFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: undefined
    });
  });

  test('Обработка успешного запроса', () => {
    const action = { type: getAllFeeds.fulfilled.type, payload: mockOrder };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockOrder.orders,
      total: mockOrder.total,
      totalToday: mockOrder.totalToday
    });
  });

  test('Обработка ошибки при запросе', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: 'Ошибка'
    });
  });
});
