import { getIngredientsApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

const initialState = {
  ingredients: [] as Array<TIngredient>,
  loading: false as boolean,
  error: null as string | null | undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientsLoadingState: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  }
});

export const {
  getIngredientsState,
  getIngredientsLoadingState,
  getIngredients
} = ingredientsSlice.selectors;
