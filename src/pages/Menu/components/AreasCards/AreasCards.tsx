import clsx from 'clsx';
import { mealsService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { AreaCards } from '../AreaCards';

import classes from './AreasCards.module.css';

interface AreasCardsProps {
  className?: string;
}

export const AreasCards: React.FC<AreasCardsProps> = ({ className }) => {
  const { data: { data: areasData } = {} } = useQuery({
    queryKey: ['getMealsAreas'],
    queryFn: mealsService.getMealsAreas,
  });

  return (
    <div className={clsx(classes.container, className)}>
      {areasData?.map((area) => (
        <AreaCards key={area.name} area={area.name} />
      ))}
    </div>
  );
};
