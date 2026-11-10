import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';

type TSelectedIngredientState = {
  item: TIngredient | null;
};

const initialState: TSelectedIngredientState = {
  item: null,
};

export const selectedIngredientSlice = createSlice({
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
  selectors: {
    selectSelectedIngredient: (state) => state.item,
  },
});

export const { setSelectedIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export const { selectSelectedIngredient } = selectedIngredientSlice.selectors;
