import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearAll,
  constructorSelector
} from '../../services/slices/constructor-slice';
import {
  getOrderModalData,
  getOrderRequest,
  newOrder,
  resetOrder
} from '../../services/slices/new-order-slice';
import { useNavigate } from 'react-router-dom';
import { isAuthCheckedSelector } from '../../services/slices/user-slice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuth = useSelector(isAuthCheckedSelector);
  const constructorItems = useSelector(constructorSelector.selectItems);

  const onOrderClick = () => {
    if (!isAuth) {
      return nav('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(newOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    nav('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
