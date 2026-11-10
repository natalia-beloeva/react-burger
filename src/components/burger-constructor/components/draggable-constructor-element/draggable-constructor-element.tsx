import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  moveIngredient,
  removeIngredient,
} from '@services/burger-constructor/burger-constructor-slice';
import { useAppDispatch } from '@services/hooks';
import { CONSTRUCTOR_INGREDIENT_DND_TYPE } from '@utils/constants';

import type { TConstructorIngredient } from '@utils/types';

import styles from './draggable-constructor-element.module.css';

type TSortItem = {
  key: string;
  index: number;
  originalIndex: number;
};

type TDraggableConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
};

const DraggableConstructorElementComponent = ({
  ingredient,
  index,
}: TDraggableConstructorElementProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: CONSTRUCTOR_INGREDIENT_DND_TYPE,
    item: (): TSortItem => ({ key: ingredient.key, index, originalIndex: index }),
    isDragging: (monitor) => monitor.getItem<TSortItem>().key === ingredient.key,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor) => {
      if (!monitor.didDrop() && item.index !== item.originalIndex) {
        dispatch(moveIngredient({ fromIndex: item.index, toIndex: item.originalIndex }));
      }
    },
  });

  const [, drop] = useDrop<TSortItem>({
    accept: CONSTRUCTOR_INGREDIENT_DND_TYPE,
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (!itemRef.current || !clientOffset || item.index === index) {
        return;
      }

      const { top, bottom } = itemRef.current.getBoundingClientRect();
      const middleY = (bottom - top) / 2;
      const cursorY = clientOffset.y - top;

      if (item.index < index && cursorY < middleY) {
        return;
      }

      if (item.index > index && cursorY > middleY) {
        return;
      }

      dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));
      item.index = index;
    },
  });

  drag(drop(itemRef));

  const handleRemove = (): void => {
    dispatch(removeIngredient(ingredient.key));
  };

  return (
    <div ref={itemRef} className={`${styles.item} ${isDragging ? styles.dragging : ''}`}>
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

export const DraggableConstructorElement = memo(DraggableConstructorElementComponent);
