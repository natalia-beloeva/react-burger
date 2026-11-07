import { useMemo, useRef } from 'react';

import { IngredientDetails } from '@components/burger-ingredients/components/ingredient-details/ingredient-details';
import { IngredientsGroup } from '@components/burger-ingredients/components/ingredients-group/ingredients-group';
import { IngredientsTabs } from '@components/burger-ingredients/components/ingredients-tabs/ingredients-tabs';
import { Modal } from '@components/modal/modal';
import { useModal } from '@hooks/use-modal';
import { useScrollSpy } from '@hooks/use-scroll-spy';
import { INGREDIENT_CATEGORIES } from '@utils/constants';

import type { TIngredient, TIngredientType } from '@utils/types';

import styles from '../burger-ingredients/burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
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

  const {
    modalData: selectedIngredient,
    openModal: openIngredientModal,
    closeModal: closeIngredientModal,
  } = useModal<TIngredient>();

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
            onIngredientClick={openIngredientModal}
          />
        ))}
      </div>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
