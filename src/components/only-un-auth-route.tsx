import { useAppSelector } from '../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '@selectors';

type OnlyUnAuthRouteProps = {
  element: React.ReactElement;
};

export const OnlyUnAuthRoute = ({ element }: OnlyUnAuthRouteProps) => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return element;
};
