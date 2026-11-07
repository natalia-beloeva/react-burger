import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { INGREDIENT_CATEGORIES } from '@utils/constants';

import type { TIngredientType } from '@utils/types';

import styles from '../ingredients-tabs/ingredients-tabs.module.css';

type TIngredientsTabsProps = {
  currentTab: TIngredientType;
  onTabClick: (value: TIngredientType) => void;
};

export const IngredientsTabs = ({
  currentTab,
  onTabClick,
}: TIngredientsTabsProps): React.JSX.Element => {
  return (
    <nav>
      <ul className={styles.tabs}>
        {INGREDIENT_CATEGORIES.map((category) => (
          <li key={category.type}>
            <Tab
              value={category.type}
              active={currentTab === category.type}
              onClick={() => onTabClick(category.type)}
            >
              {category.title}
            </Tab>
          </li>
        ))}
      </ul>
    </nav>
  );
};
