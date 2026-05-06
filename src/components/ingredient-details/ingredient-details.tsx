import { FC, useEffect } from 'react';
import { useAppSelector } from '../../services/hooks';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredients } from '@selectors';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(getIngredients);
  const ingredientData = ingredients.find((item) => item._id === id) || null;

  useEffect(() => {
    if (location.state?.background) {
      // Удаляем фоновое состояние, чтобы модальное окно не "застревало"
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
