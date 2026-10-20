import { INGREDIENTS_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredient[]> => {
  const res = await fetch(INGREDIENTS_URL);

  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }

  const json = (await res.json()) as TIngredientsResponse;

  return json.data;
};
