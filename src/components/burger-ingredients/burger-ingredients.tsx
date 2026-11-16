import { useMemo, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IngredientsGroup } from '@components/burger-ingredients/components/ingredients-group/ingredients-group';
import { IngredientsTabs } from '@components/burger-ingredients/components/ingredients-tabs/ingredients-tabs';
import { useScrollSpy } from '@hooks/use-scroll-spy';
import { useAppSelector } from '@services/hooks';
import { selectIngredients } from '@services/ingredients/ingredients-slice';
import { INGREDIENT_CATEGORIES } from '@utils/constants';

import type { TIngredient, TIngredientType } from '@utils/types';

import styles from '../burger-ingredients/burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useAppSelector(selectIngredients);

  const ingredientsByType: Record<TIngredientType, TIngredient[]> = useMemo(
    () => ({
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
    }),
    [ingredients]
  );

  const listsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const saucesRef = useRef<HTMLElement>(null);
  const mainsRef = useRef<HTMLElement>(null);

  const groupRefs: Record<TIngredientType, React.RefObject<HTMLElement | null>> = {
    bun: bunsRef,
    sauce: saucesRef,
    main: mainsRef,
  };

  const categorySections = INGREDIENT_CATEGORIES.map((category) => ({
    id: category.type,
    ref: groupRefs[category.type],
  }));

  const {
    activeSection: currentTab,
    handleScroll: handleListsScroll,
    scrollToSection,
  } = useScrollSpy(listsRef, categorySections, INGREDIENT_CATEGORIES[0].type);

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient) => {
      void navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location },
      });
    },
    [navigate, location]
  );

  return (
    <section className={styles.burger_ingredients}>
      <IngredientsTabs currentTab={currentTab} onTabClick={scrollToSection} />

      <div
        ref={listsRef}
        className={`${styles.lists} custom-scroll mt-10`}
        onScroll={handleListsScroll}
      >
        {INGREDIENT_CATEGORIES.map((category) => (
          <IngredientsGroup
            key={category.type}
            ref={groupRefs[category.type]}
            title={category.title}
            ingredients={ingredientsByType[category.type]}
            onIngredientClick={handleIngredientClick}
          />
        ))}
      </div>
    </section>
  );
};
