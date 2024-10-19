import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, CardGrid, CardSkeleton, Counter } from '@/components/ui';
import { mealsService } from '@/services';
import { cartActions, useAppDispatch, useAppSelector } from '@/store';
import { ShortMeal } from '@/types';

import classes from './AreaCards.module.css';

export interface AreaCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  area: string;
}
const SKELETON_CARDS_LENGTH = 20;
const SKELETON_CARDS = new Array(SKELETON_CARDS_LENGTH)
  .fill(null)
  .map((_, i) => i);

export const AreaCards: React.FC<AreaCardsProps> = ({ area }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.meals);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isPending, data: { data } = {} } = useQuery({
    queryKey: [area],
    queryFn: () => mealsService.getMealsByArea(area),
    enabled: inView,
  });

  const addToCart = (meal: ShortMeal) => {
    dispatch(cartActions.addMeal(meal));
  };

  const increment = (id: string) => {
    dispatch(cartActions.incrementMeal(id));
  };

  const decrement = (id: string) => {
    dispatch(cartActions.decrementMeal(id));
  };

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.title}>{area}</div>
      <CardGrid>
        {isPending
          ? SKELETON_CARDS.map((key) => <CardSkeleton key={key} />)
          : data?.map((meal) => {
              const count = cart.find((c) => c.id === meal.id)?.count ?? 0;
              return (
                <Card
                  onClick={() => navigate(`/meal/${meal.id}`)}
                  key={meal.id}
                  style={{ height: '100%' }}
                  title={meal.name}
                  image={meal.img}
                  price={`${meal.price}$`}
                  action={
                    count ? (
                      <Counter
                        count={count}
                        onDecrement={() => decrement(meal.id)}
                        onIncrement={() => increment(meal.id)}
                      />
                    ) : (
                      <Button onClick={() => addToCart(meal)}>Buy</Button>
                    )
                  }
                />
              );
            })}
      </CardGrid>
    </div>
  );
};
