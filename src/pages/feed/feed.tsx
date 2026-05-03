import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getFeedOrders);
  const total = useSelector(getFeedTotal);
  const totalToday = useSelector(getFeedTotalToday);
  const loading = useSelector(getFeedLoading);

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
