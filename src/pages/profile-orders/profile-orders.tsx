import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getFeedOrders, getFeedLoading } from '@selectors';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getFeedOrders);
  const loading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
