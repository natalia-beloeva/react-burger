import { useMemo, useState, useRef } from 'react';

import { IngredientsGroup } from '@components/burger-ingredients/components/ingredients-group/ingredients-group';
import { IngredientsTabs } from '@components/burger-ingredients/components/ingredients-tabs/ingredients-tabs';

import type { TBurgerIngredientsProps } from '../burger-ingredients/types';
import type { TIngredientType } from '@utils/types';

import styles from '../burger-ingredients/burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );

  const bunsRef = useRef<HTMLElement>(null);
  const saucesRef = useRef<HTMLElement>(null);
  const mainsRef = useRef<HTMLElement>(null);

  const groupRefs: Record<TIngredientType, React.RefObject<HTMLElement | null>> = {
    bun: bunsRef,
    sauce: saucesRef,
    main: mainsRef,
  };

  const [currentTab, setCurrentTab] = useState<TIngredientType>('bun');

  return (
    <section className={styles.burger_ingredients}>
      <IngredientsTabs
        currentTab={currentTab}
        onTabClick={(tab) => {
          setCurrentTab(tab);
          groupRefs[tab].current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div className={`${styles.lists} custom-scroll mt-10`}>
        <IngredientsGroup ref={bunsRef} title="Булки" ingredients={buns} />
        <IngredientsGroup
          ref={saucesRef}
          title="Соусы"
          ingredients={sauces}
          className="mt-10"
        />
        <IngredientsGroup
          ref={mainsRef}
          title="Начинки"
          ingredients={mains}
          className="mt-10"
        />
      </div>
    </section>
  );
};
