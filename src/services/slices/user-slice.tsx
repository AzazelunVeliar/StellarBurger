import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

const initialState = {
  isAuthChecked: false as boolean,
  user: {
    email: '',
    name: ''
  } as TUser,
  authError: '' as string | undefined,
  registerError: '' as string | undefined
};

export const apiGetUser = createAsyncThunk(
  'user/getUserByAuthToken',
  getUserApi
);
export const updateUser = createAsyncThunk(
  'user/updateUserInfo',
  updateUserApi
);
export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.authError = '';
        state.registerError = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.authError =
          action.error.message || 'Произошла ошибка аутентификации';
        state.registerError =
          action.error.message || 'Произошла ошибка ргеистрации';
      })
      .addCase(register.pending, (state) => {
        state.authError = '';
        state.registerError = '';
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.authError = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.authError =
          action.error.message || 'Произошла ошибка аутентификации';
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.authError = '';
      });

    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.authError =
          action.error.message || 'Произошла ошибка аутентификации';
      });

    // Update User
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.authError =
          action.error.message || 'Произошла ошибка аутентификации';
      })
      .addCase(updateUser.pending, (state) => {
        state.authError = '';
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getAuthError: (state) => state.authError,
    getRegisterError: (state) => state.registerError
  }
});

export const {
  isAuthCheckedSelector,
  getUser,
  getName,
  getAuthError,
  getRegisterError
} = userSlice.selectors;
