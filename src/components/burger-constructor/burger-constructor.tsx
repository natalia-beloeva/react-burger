import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorPlaceholder } from '@components/burger-constructor/components/constructor-placeholder/constructor-placeholder';
import { DraggableConstructorElement } from '@components/burger-constructor/components/draggable-constructor-element/draggable-constructor-element';
import { OrderSummary } from '@components/burger-constructor/components/order-summary/order-summary';
import { addIngredient } from '@services/burger-constructor/burger-constructor-slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { CONSTRUCTOR_INGREDIENT_DND_TYPE, INGREDIENT_DND_TYPE } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const dispatch = useAppDispatch();

  const dropAreaRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: INGREDIENT_DND_TYPE,
    drop: (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  drop(dropAreaRef);

  const listRef = useRef<HTMLUListElement>(null);
  const [, listDrop] = useDrop({ accept: CONSTRUCTOR_INGREDIENT_DND_TYPE });

  listDrop(listRef);

  const totalPrice = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [bun, ingredients]
  );

  const orderIngredientIds = useMemo(
    () =>
      bun ? [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id] : [],
    [bun, ingredients]
  );

  return (
    <section className={styles.burger_constructor}>
      <div
        ref={dropAreaRef}
        className={`${styles.elements} ${isOver ? styles.drop_hover : ''}`}
      >
        <div className={`${styles.bun} custom-scroll`}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorPlaceholder type="top" text="Выберите булки" />
          )}
        </div>

        <ul ref={listRef} className={`${styles.ingredients} custom-scroll`}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <li key={ingredient.key}>
                <DraggableConstructorElement ingredient={ingredient} index={index} />
              </li>
            ))
          ) : (
            <li className={styles.ingredient_placeholder}>
              <ConstructorPlaceholder text="Выберите начинку" />
            </li>
          )}
        </ul>

        <div className={`${styles.bun} custom-scroll`}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorPlaceholder type="bottom" text="Выберите булки" />
          )}
        </div>
      </div>

      <OrderSummary totalPrice={totalPrice} ingredientIds={orderIngredientIds} />
    </section>
  );
};
