import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientType } from '@utils/types';

import styles from '../ingredients-tabs/ingredients-tabs.module.css';

const tabs: { value: TIngredientType; title: string }[] = [
  { value: 'bun', title: 'Булки' },
  { value: 'sauce', title: 'Соусы' },
  { value: 'main', title: 'Начинки' },
];

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
        {tabs.map((tab) => (
          <li key={tab.value}>
            <Tab
              value={tab.value}
              active={currentTab === tab.value}
              onClick={() => onTabClick(tab.value)}
            >
              {tab.title}
            </Tab>
          </li>
        ))}
      </ul>
    </nav>
  );
};
