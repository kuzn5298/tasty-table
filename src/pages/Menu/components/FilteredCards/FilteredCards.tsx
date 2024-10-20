import clsx from 'clsx';
import { mealsService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { CardGrid, CardGridSkeleton } from '@/components/ui';
import { selectCartMeals, useAppSelector } from '@/store';
import { MealCard } from '../MealCard';

import classes from './FilteredCards.module.css';

interface FilteredCardsProps {
  className?: string;
  search?: string;
  area?: string;
  category?: string;
}

export const FilteredCards: React.FC<FilteredCardsProps> = ({
  area,
  category,
  search,
  className,
}) => {
  const cart = useAppSelector(selectCartMeals);

  const { data: { data: filteredData } = {}, isPending } = useQuery({
    queryKey: ['getMealsByFilter', search, category, area],
    queryFn: () =>
      mealsService.getMealsByFilter({
        search,
        category,
        area,
      }),
  });

  return (
    <div className={clsx(classes.container, className)}>
      {isPending ? (
        <CardGridSkeleton length={10} />
      ) : (
        <CardGrid>
          {filteredData?.map((meal) => {
            const count = cart[meal.id]?.count ?? 0;
            return <MealCard key={meal.id} meal={meal} count={count} />;
          })}
        </CardGrid>
      )}
    </div>
  );
};
