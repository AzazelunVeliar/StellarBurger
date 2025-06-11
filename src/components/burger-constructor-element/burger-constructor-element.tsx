import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  constructorSelector,
  deleteItem,
  updateAll
} from '../../services/slices/constructor-slice';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const constructorItems = useSelector(constructorSelector.selectItems);
    const dispatch = useDispatch();
    function swapElements(
      array: TConstructorIngredient[],
      index1: number,
      index2: number
    ) {
      const newArr = [...array];
      [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
      return newArr;
    }

    const handleMoveDown = () => {
      dispatch(
        updateAll(swapElements(constructorItems.ingredients, index, index + 1))
      );
    };

    const handleMoveUp = () => {
      dispatch(
        updateAll(swapElements(constructorItems.ingredients, index, index - 1))
      );
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
