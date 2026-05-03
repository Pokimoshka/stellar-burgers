import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { getIngredientsLoading, getIngredients } from '../services/selectors';
import { fetchIngredients } from '../services/slices/ingredientsSlice';
import { getUser } from '@selectors';
import { AppDispatch } from '../services/store';

export const ConstructorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);
  const user = useSelector(getUser);
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
