import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ConstructorPageUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getIngredients, getIngredientsLoading } from '@selectors';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '@selectors';
import { AppDispatch } from 'src/services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);
  const user = useSelector(getUser);

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
