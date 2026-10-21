import { INGREDIENTS_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response = await fetch(INGREDIENTS_URL);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }

  const responseBody = (await response.json()) as TIngredientsResponse;

  if (!responseBody.success) {
    throw new Error('Сервер не смог вернуть список ингредиентов');
  }

  return responseBody.data;
};
