import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { CardGrid, CardGridSkeleton } from '@/components/ui';
import { mealsService } from '@/services';
import { useAppSelector } from '@/store';
import { MealCard } from '../MealCard';

import classes from './AreaCards.module.css';

export interface AreaCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  area: string;
}

export const AreaCards: React.FC<AreaCardsProps> = ({ area }) => {
  const cart = useAppSelector((state) => state.cart.meals);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isPending, data: { data } = {} } = useQuery({
    queryKey: ['getMealsByArea', area],
    queryFn: () => mealsService.getMealsByArea(area),
    enabled: inView,
  });

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.title}>{area}</div>
      {isPending ? (
        <CardGridSkeleton />
      ) : (
        <CardGrid>
          {data?.map((meal) => {
            const count = cart.find((c) => c.id === meal.id)?.count ?? 0;
            return <MealCard key={meal.id} meal={meal} count={count} />;
          })}
        </CardGrid>
      )}
    </div>
  );
};
