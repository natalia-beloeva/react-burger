import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TDraggableConstructorElementProps } from './types';

import styles from './draggable-constructor-element.module.css';

export const DraggableConstructorElement = ({
  ingredient,
}: TDraggableConstructorElementProps): React.JSX.Element => {
  return (
    <div className={styles.item}>
      <DragIcon type="primary" className={styles.icon} />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};
