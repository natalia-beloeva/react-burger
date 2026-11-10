import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from '@services/ingredients/ingredients-slice';
import { selectedIngredientReducer } from '@services/selected-ingredient/selected-ingredient-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredient: selectedIngredientReducer,
});
