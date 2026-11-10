import type { TIngredientType } from '@utils/types';

export const BASE_URL = 'https://norma.ffapi.ru/api';

export const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
export const ORDERS_URL = `${BASE_URL}/orders`;

export const INGREDIENT_CATEGORIES: { type: TIngredientType; title: string }[] = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

export const INGREDIENT_DND_TYPE = 'ingredient';
export const CONSTRUCTOR_INGREDIENT_DND_TYPE = 'constructor-ingredient';
