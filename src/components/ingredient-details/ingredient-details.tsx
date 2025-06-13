import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientsSelector = useSelector(getIngredientsState);
  const { id } = useParams();
  const data = ingredientsSelector.ingredients.find((el) => el._id === id);
  if (!data) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={data} />;
};
