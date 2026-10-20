import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import { DraggableConstructorElement } from '@components/burger-constructor/components/draggable-constructor-element/draggable-constructor-element';

import type { TBurgerConstructorProps } from './types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const fillings = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.elements}>
        {bun && (
          <div className={`${styles.bun} custom-scroll`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <ul className={`${styles.fillings} custom-scroll`}>
          {fillings.map((ingredient) => (
            <li key={ingredient._id}>
              <DraggableConstructorElement ingredient={ingredient} />
            </li>
          ))}
        </ul>

        {bun && (
          <div className={`${styles.bun} custom-scroll`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
    </section>
  );
};
