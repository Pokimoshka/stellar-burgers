import { FC, useMemo } from 'react';
import { useAppSelector } from '../../services/hooks';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';
import { getFeedOrders, getFeedTotal, getFeedTotalToday } from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
