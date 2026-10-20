import type { TIngredientType } from '@utils/types';

export type TIngredientsTabsProps = {
  currentTab: TIngredientType;
  onTabClick: (value: TIngredientType) => void;
};
