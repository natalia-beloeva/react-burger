import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { removeIngredient } from '@services/burger-constructor/burger-constructor-slice';
import { useAppDispatch } from '@services/hooks';

import type { TConstructorIngredient } from '@utils/types';

import styles from './draggable-constructor-element.module.css';

type TDraggableConstructorElementProps = {
  ingredient: TConstructorIngredient;
};

export const DraggableConstructorElement = ({
  ingredient,
}: TDraggableConstructorElementProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const handleRemove = (): void => {
    dispatch(removeIngredient(ingredient.key));
  };

  return (
    <div className={styles.item}>
      <DragIcon type="primary" className={styles.icon} />

      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemove}
      />
    </div>
  );
};
