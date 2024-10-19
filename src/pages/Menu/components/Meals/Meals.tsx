import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Counter } from '@/components/ui';
import {
  cartActions,
  mealActions,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { FetchStatus } from '@/constants';
import { ShortMeal } from '@/types';

import classes from './Meals.module.css';

interface MealsProps {
  category: string;
}

const Meals: React.FC<MealsProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { meals, status } = useAppSelector((state) => state.meal);
  const cartMeals = useAppSelector((state) => state.cart.meals);
  const isLoading = status[category] === FetchStatus.Loading;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      category &&
      (status[category] === FetchStatus.Idle || status[category] === undefined)
    ) {
      dispatch(mealActions.fetchMealsByCategory(category));
    }
  }, [status, category, dispatch]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  const addToCart = (meal: ShortMeal) => {
    dispatch(
      cartActions.addMeal({
        ...meal,
        price: 10.5,
      })
    );
  };

  const increment = (id: string) => {
    dispatch(cartActions.incrementMeal(id));
  };

  const decrement = (id: string) => {
    dispatch(cartActions.decrementMeal(id));
  };

  return (
    <div className={classes.container}>
      <ul className={classes.grid}>
        {meals[category]?.map((meal) => {
          const count =
            cartMeals.find((cartMeal) => cartMeal.idMeal === meal.idMeal)
              ?.count ?? 0;
          return (
            <li key={meal.idMeal}>
              <Card
                style={{ height: '100%' }}
                title={meal.strMeal}
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
                image={meal.strMealThumb}
                price={'15$'}
                action={
                  count ? (
                    <Counter
                      count={count}
                      onDecrement={() => decrement(meal.idMeal)}
                      onIncrement={() => increment(meal.idMeal)}
                    />
                  ) : (
                    <Button onClick={() => addToCart(meal)}>Buy</Button>
                  )
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Meals;
