import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { ConstructorPageUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getIngredients, getIngredientsLoading } from '@selectors';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '@selectors';
import { AppDispatch } from 'src/services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getIngredientsLoading);
  const ingredients = useAppSelector(getIngredients);
  const user = useAppSelector(getUser);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
    }
  };

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  return <ConstructorPageUI isIngredientsLoading={isLoading} />;
};
