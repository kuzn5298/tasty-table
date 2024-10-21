import { useState } from 'react';
import { AreasCards, FilteredCards, Filters, FilterType } from './components';
import { MealDialogProvider } from './contexts';

import classes from './Menu.module.css';

const Menu = () => {
  const [filter, setFilter] = useState<FilterType>({
    search: '',
    area: '',
    category: '',
  });

  const withFilters = Object.values(filter).some(Boolean);

  return (
    <MealDialogProvider>
      <div className={classes.container}>
        <Filters value={filter} onChange={setFilter} />
        <div className={classes['scroll-container']}>
          {withFilters ? (
            <FilteredCards
              search={filter.search}
              area={filter.area}
              category={filter.category}
            />
          ) : (
            <AreasCards />
          )}
        </div>
      </div>
    </MealDialogProvider>
  );
};

export default Menu;
