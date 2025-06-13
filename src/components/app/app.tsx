import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getIngredientsList } from '../../services/slices/ingredients-slice';
import { useDispatch } from '../../services/store';
import { apiGetUser } from '../../services/slices/user-slice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsList());
    if (getCookie('accessToken')) {
      dispatch(apiGetUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute withoutAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute withoutAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute withoutAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute withoutAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={() => navigation(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => navigation(-1)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={() => navigation(-1)}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
