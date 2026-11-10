import { createSlice, nanoid } from '@reduxjs/toolkit';

import { placeOrder } from '@services/order/order-slice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TConstructorIngredient, TIngredient } from '@utils/types';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  fillings: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: [],
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
          state.fillings.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, key: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (ingredient) => ingredient.key !== action.payload
      );
    },
    clearConstructor: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, () => initialState);
  },
});

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
