import type { TIngredientType } from '@utils/types';

export const INGREDIENTS_URL = 'https://norma.ffapi.ru/api/ingredients';

export const INGREDIENT_CATEGORIES: { type: TIngredientType; title: string }[] = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];
