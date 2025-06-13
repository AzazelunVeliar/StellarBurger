import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderByNumberApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients-slice';

interface OrderData extends Omit<TOrder, 'ingredients'> {
  ingredients: string[];
}

interface IngredientsWithCount {
  [key: string]: TIngredient & { count: number };
}
interface OrderInfoProcessed extends OrderData {
  ingredientsInfo: IngredientsWithCount;
  date: Date;
  total: number;
}

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const ingredients = useSelector(getIngredients);
  const { number: orderNumber } = useParams();

  const orderInfo = useMemo<OrderInfoProcessed | null>(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce<IngredientsWithCount>(
      (acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    if (orderNumber) {
      const fetchOrderData = async () => {
        try {
          const data = await getOrderByNumberApi(Number(orderNumber));
          if (data && data.orders && data.orders.length > 0) {
            setOrderData(data.orders[0]);
          }
        } catch (e) {
          console.error('Error fetching the order data', e);
        }
      };

      fetchOrderData();
    }
  }, [orderNumber]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
