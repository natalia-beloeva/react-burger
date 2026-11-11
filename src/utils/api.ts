import { INGREDIENTS_URL, ORDERS_URL } from '@utils/constants';

import type { TIngredient, TOrder } from '@utils/types';

type TSuccessResponse = {
  success: boolean;
};

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TOrderResponse = {
  name: string;
  order: TOrder;
  success: boolean;
};

const checkResponse = async <T extends TSuccessResponse>(
  response: Response,
  errorMessage: string
): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }

  const responseBody = (await response.json()) as T;

  if (!responseBody.success) {
    throw new Error(errorMessage);
  }

  return responseBody;
};

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response = await fetch(INGREDIENTS_URL);

  const responseBody = await checkResponse<TIngredientsResponse>(
    response,
    'Не удалось загрузить ингредиенты'
  );

  return responseBody.data;
};

export const createOrder = async (ingredientIds: string[]): Promise<TOrder> => {
  const response = await fetch(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

  const responseBody = await checkResponse<TOrderResponse>(
    response,
    'Не удалось создать заказ'
  );

  return responseBody.order;
};
