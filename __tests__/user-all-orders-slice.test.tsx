import { TOrder } from '../src/utils/types';
import {
  getUserOrders,
  userOrdersSlice
} from '../src/services/slices/user-all-orders-slice';

const mockOrders = [
  {
    _id: '67614059750864001d371de2',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Краторный space бургер',
    createdAt: '2024-12-17T09:11:53.434Z',
    updatedAt: '2024-12-17T09:11:54.436Z',
    number: 62990
  },
  {
    _id: '67613f4f750864001d371de0',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-12-17T09:07:27.638Z',
    updatedAt: '2024-12-17T09:07:28.634Z',
    number: 62989
  }
];

const initialState = {
  orders: [] as Array<TOrder>,
  isLoading: true as boolean
};

describe('Заказы пользователя', () => {
  test('Обработка ожидания', () => {
    const action = { type: getUserOrders.pending.type };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  test('Обработка ошибки', () => {
    const action = {
      type: getUserOrders.rejected.type
    };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  test('Обработка успешно выполненного запроса', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockOrders
    });
  });
});
