import { useAppDispatch, useAppSelector } from '../services/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { getIngredientsLoading, getIngredients } from '../services/selectors';
import { fetchIngredients } from '../services/slices/ingredientsSlice';
import { getUser } from '@selectors';
import { AppDispatch } from '../services/store';

export const ConstructorPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIngredientsLoading);
  const ingredients = useAppSelector(getIngredients);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main>
      <h1>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
