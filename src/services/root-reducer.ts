import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorReducer } from '@services/burger-constructor/burger-constructor-slice';
import { ingredientsReducer } from '@services/ingredients/ingredients-slice';
import { orderReducer } from '@services/order/order-slice';
import { selectedIngredientReducer } from '@services/selected-ingredient/selected-ingredient-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredient: selectedIngredientReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer,
});
