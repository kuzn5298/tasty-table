import { Button, Card, Counter } from '@/components/ui';
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
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  count = 0,
  onClick,
}) => {
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
      onClick={onClick}
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
