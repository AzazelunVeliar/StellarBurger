import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  listOfOrders
} from '../../services/slices/user-all-orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(listOfOrders);

  return <ProfileOrdersUI orders={orders} />;
};
