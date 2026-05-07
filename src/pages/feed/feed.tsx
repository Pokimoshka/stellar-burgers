import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getFeedLoading
} from '@selectors';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);
  const loading = useAppSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
