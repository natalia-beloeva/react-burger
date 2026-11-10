import { combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from '@services/ingredients/ingredients-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});
