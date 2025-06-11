import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/slices/feeds-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getOrdersFeeds);
  const totalFeeds = useSelector(getTotalFeeds);
  const totalToday = useSelector(getTotalTodayFeeds);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  const feeds = { total: totalFeeds, totalToday: totalToday };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feeds}
    />
  );
};
