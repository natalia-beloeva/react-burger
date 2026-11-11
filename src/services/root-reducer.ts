import { combineSlices } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burger-constructor/burger-constructor-slice';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice';
import { orderSlice } from '@services/order/order-slice';
import { selectedIngredientSlice } from '@services/selected-ingredient/selected-ingredient-slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  selectedIngredientSlice,
  orderSlice,
  burgerConstructorSlice
);
