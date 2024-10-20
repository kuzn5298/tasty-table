import { useNavigate } from 'react-router-dom';
import { Button, Card, Counter } from '@/components/ui';
import { AppRoute } from '@/constants';
import {
  addMealToCart,
  decrementMealInCart,
  incrementMealInCart,
  useAppDispatch,
} from '@/store';
import { ShortMeal } from '@/types';

interface MealCardProps {
  meal: ShortMeal;
  count?: number;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, count = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCart = (meal: ShortMeal) => {
    dispatch(addMealToCart(meal));
  };

  const increment = (id: string) => {
    dispatch(incrementMealInCart(id));
  };

  const decrement = (id: string) => {
    dispatch(decrementMealInCart(id));
  };

  return (
    <Card
      onClick={() => navigate(AppRoute.Meal.replace(':id', meal.id))}
      key={meal.id}
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
};
