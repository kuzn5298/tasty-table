import { useQuery } from '@tanstack/react-query';
import { mealsService } from '@/services';
import { AreaCards } from './components';

import classes from './Menu.module.css';

const Menu = () => {
  const { data: { data: areasData } = {} } = useQuery({
    queryKey: [],
    queryFn: mealsService.getMealsAreas,
  });

  return (
    <div className={classes.container}>
      {areasData?.map((area) => (
        <AreaCards key={area.name} area={area.name} />
      ))}
    </div>
  );
};

export default Menu;
