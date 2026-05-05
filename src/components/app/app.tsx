import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { AppHeader } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '../protected-route';
import { OnlyUnAuthRoute } from '../only-un-auth-route';
import { Modal, IngredientDetails, OrderInfo } from '@components';
import { fetchUser } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { AppDispatch } from '../../services/store';
import styles from './app.module.css';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.mainContent}>
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={<OnlyUnAuthRoute element={<Login />} />}
          />
          <Route
            path='/register'
            element={<OnlyUnAuthRoute element={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<OnlyUnAuthRoute element={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<OnlyUnAuthRoute element={<ResetPassword />} />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path='/profile/orders'
            element={<ProtectedRoute element={<ProfileOrders />} />}
          />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute element={<OrderInfo />} />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Информация о заказе' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute
                  element={
                    <Modal
                      title='Информация о заказе'
                      onClose={handleCloseModal}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
