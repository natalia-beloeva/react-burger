import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientsTabsProps } from '../ingredients-tabs/types';
import type { TIngredientType } from '@utils/types';

import styles from '../ingredients-tabs/ingredients-tabs.module.css';

const tabs: { value: TIngredientType; title: string }[] = [
  { value: 'bun', title: 'Булки' },
  { value: 'sauce', title: 'Соусы' },
  { value: 'main', title: 'Начинки' },
];

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
              onClick={(value) => onTabClick(value as TIngredientType)}
            >
              {tab.title}
            </Tab>
          </li>
        ))}
      </ul>
    </nav>
  );
};
