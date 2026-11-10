import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorPlaceholder } from '@components/burger-constructor/components/constructor-placeholder/constructor-placeholder';
import { DraggableConstructorElement } from '@components/burger-constructor/components/draggable-constructor-element/draggable-constructor-element';
import { OrderSummary } from '@components/burger-constructor/components/order-summary/order-summary';
import {
  addIngredient,
  selectBun,
  selectConstructorIngredients,
} from '@services/burger-constructor/burger-constructor-slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { CONSTRUCTOR_INGREDIENT_DND_TYPE, INGREDIENT_DND_TYPE } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectConstructorIngredients);

  const dropAreaRef = useRef<HTMLDivElement>(null);

  const [{ isOver, draggedType }, drop] = useDrop({
    accept: INGREDIENT_DND_TYPE,
    drop: (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedType: monitor.canDrop() ? monitor.getItem<TIngredient>().type : null,
    }),
  });

  const isBunDragged = draggedType === 'bun';
  const isFillingDragged = draggedType !== null && draggedType !== 'bun';
  const isPlaceholderHighlighted =
    (isBunDragged && !bun) || (isFillingDragged && ingredients.length === 0);

  drop(dropAreaRef);

  const listRef = useRef<HTMLUListElement>(null);
  const [, listDrop] = useDrop({ accept: CONSTRUCTOR_INGREDIENT_DND_TYPE });

  listDrop(listRef);

  return (
    <section className={styles.burger_constructor}>
      <div
        ref={dropAreaRef}
        className={`${styles.elements} ${isOver && !isPlaceholderHighlighted ? styles.drop_hover : ''}`}
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
            <ConstructorPlaceholder
              type="top"
              text="Выберите булки"
              isHighlighted={isBunDragged}
            />
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
              <ConstructorPlaceholder
                text="Выберите начинку"
                isHighlighted={isFillingDragged}
              />
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
            <ConstructorPlaceholder
              type="bottom"
              text="Выберите булки"
              isHighlighted={isBunDragged}
            />
          )}
        </div>
      </div>

      <OrderSummary />
    </section>
  );
};
