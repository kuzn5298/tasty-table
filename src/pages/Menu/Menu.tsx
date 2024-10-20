import { useState } from 'react';
import { AreasCards, FilteredCards, Filters, FilterType } from './components';

import classes from './Menu.module.css';

const Menu = () => {
  const [filter, setFilter] = useState<FilterType>({
    search: '',
    area: '',
    category: '',
  });

  const withFilters = Object.values(filter).some(Boolean);

  return (
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
  );
};

export default Menu;
