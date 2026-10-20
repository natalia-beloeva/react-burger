import type { TIngredient } from '@utils/types';

export type TIngredientsGroupProps = {
  ref: React.Ref<HTMLElement>;
  title: string;
  ingredients: TIngredient[];
  className?: string;
};
