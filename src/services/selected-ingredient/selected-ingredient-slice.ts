import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';

type TSelectedIngredientState = {
  item: TIngredient | null;
};

const initialState: TSelectedIngredientState = {
  item: null,
};

const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.item = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.item = null;
    },
  },
});

export const selectedIngredientReducer = selectedIngredientSlice.reducer;
export const { setSelectedIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
