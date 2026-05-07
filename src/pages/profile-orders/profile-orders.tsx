import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getFeedOrders, getFeedLoading } from '@selectors';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const loading = useAppSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
