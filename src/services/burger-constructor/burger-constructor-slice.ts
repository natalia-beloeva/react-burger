import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { placeOrder } from '@services/order/order-slice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';
import type { TConstructorIngredient, TIngredient } from '@utils/types';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, key: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedIngredient] = state.ingredients.splice(fromIndex, 1);

      state.ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearConstructor: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, () => initialState);
  },
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

const selectBurgerConstructor = (state: RootState): TBurgerConstructorState =>
  state.burgerConstructor;

export const selectIngredientCounts = createSelector(
  [selectBurgerConstructor],
  ({ bun, ingredients }): Record<string, number> => {
    const counts: Record<string, number> = {};

    for (const ingredient of ingredients) {
      counts[ingredient._id] = (counts[ingredient._id] ?? 0) + 1;
    }

    if (bun) {
      counts[bun._id] = 2;
    }

    return counts;
  }
);

export const selectTotalPrice = createSelector(
  [selectBurgerConstructor],
  ({ bun, ingredients }): number =>
    (bun ? bun.price * 2 : 0) +
    ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
);

export const selectOrderIngredientIds = createSelector(
  [selectBurgerConstructor],
  ({ bun, ingredients }): string[] =>
    bun ? [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id] : []
);
