import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredients-slice';
import { constructorSlice } from './slices/constructor-slice';
import { newOrderSlice } from './slices/new-order-slice';
import { userSlice } from './slices/user-slice';
import { feedsSlice } from './slices/feeds-slice';
import { userOrdersSlice } from './slices/user-all-orders-slice';

const rootReducer = {
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
