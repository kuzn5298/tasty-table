import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mealsService } from '@/services';
import { AreaCards, Filters, FilterType } from './components';

import classes from './Menu.module.css';

const Menu = () => {
  const [filter, setFilter] = useState<FilterType>({
    search: '',
    area: '',
    category: '',
  });

  const { data: { data: areasData } = {} } = useQuery({
    queryKey: ['getMealsAreas'],
    queryFn: mealsService.getMealsAreas,
  });

  return (
    <div className={classes.container}>
      <Filters value={filter} onChange={setFilter} />
      {areasData?.map((area) => (
        <AreaCards key={area.name} area={area.name} />
      ))}
    </div>
  );
};

export default Menu;
