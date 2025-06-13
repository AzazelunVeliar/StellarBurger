import {
  apiGetUser,
  login,
  logout,
  register,
  updateUser,
  userSlice
} from '../src/services/slices/user-slice';

const initialState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  authError: '',
  registerError: ''
};

const token = {
  refreshToken: 'mymocktoken',
  accessToken: 'mymocktoken'
};

const userData = {
  email: 'my.test@mail.ru',
  name: 'My Test'
};

const loginData = {
  email: 'my.test@mail.ru',
  password: 'mytest'
};

const registerData = {
  email: 'my.test@mail.ru',
  name: 'My Test',
  password: 'mytest'
};

describe('Пользователь', () => {
  describe('Регистрация', () => {
    it('Обработка ожидания', () => {
      const state = userSlice.reducer(
        initialState,
        register.pending('pending', registerData)
      );
      expect(state.registerError).toBe('');
    });

    it('Заполнение данных аутентификации при увспешном запросе', () => {
      const state = userSlice.reducer(
        initialState,
        register.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.authError).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('Ошибка регистрации при режекте', () => {
      const errorMessage = 'Ошибка регистрации';
      const state = userSlice.reducer(
        initialState,
        register.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.registerError).toEqual(errorMessage);
    });
  });

  describe('вход', () => {
    it('Обработка', () => {
      const state = userSlice.reducer(
        initialState,
        login.pending('pending', loginData)
      );
      expect(state.authError).toBe('');
    });
    it('Заполнение данных аутентификации при увспешном запросе', () => {
      const state = userSlice.reducer(
        initialState,
        login.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          loginData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(userData);
    });
    it('Ошибка аутентификации при режекте', () => {
      const errorMessage = 'Ошибка входа';
      const state = userSlice.reducer(
        initialState,
        login.rejected(new Error(errorMessage), 'rejected', loginData)
      );
      expect(state.authError).toEqual(errorMessage);
    });
  });
  describe('выход', () => {
    it('аутентификация сбрасывается при выходе', () => {
      const state = userSlice.reducer(initialState, {
        type: logout.fulfilled.type
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });
  });
  describe('получение пользователя по токену', () => {
    it('при нахождении юзера по токену сохраняется информация аутентификации', () => {
      const state = userSlice.reducer(
        initialState,
        apiGetUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled'
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.authError).toBe('');
      expect(state.user).toEqual(userData);
    });
    it('ошибка аутентификации при режекте', () => {
      const errorMessage = 'Не удалось получить данные пользователя';
      const state = userSlice.reducer(
        initialState,
        apiGetUser.rejected(new Error(errorMessage), 'rejected')
      );
      expect(state.authError).toEqual(errorMessage);
    });
  });
  describe('обновление данных пользователя', () => {
    it('нет ошибки при выполнении  запроса', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.pending('pending', registerData)
      );
      expect(state.authError).toBe('');
    });
    it('актуальная информация об аутентификации при обновлении', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.authError).toBe('');
      expect(state.user).toEqual(userData);
    });
    it('ошибка аутентификации при режекте', () => {
      const errorMessage = 'Не удалось обновить пользователя';
      const state = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.authError).toEqual(errorMessage);
    });
  });
});
