import { ShortMeal } from '@/types';
import { Counter } from '@/components/ui';
import {
  decrementMealInCart,
  incrementMealInCart,
  removeMealFromCart,
  useAppDispatch,
} from '@/store';

import classes from './CartCard.module.css';

interface CartMeal extends ShortMeal {
  count: number;
}

export interface CartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  meal: CartMeal;
}

export const CartCard: React.FC<CartCardProps> = ({ meal, ...props }) => {
  const dispatch = useAppDispatch();

  const { id, img, name, count, price } = meal;
  return (
    <article className={classes.card} {...props}>
      <img src={img} alt={name} className={classes.img} />
      <div className={classes.body}>
        <div className={classes.title}>{name}</div>
        <Counter
          count={count}
          onDecrement={() => dispatch(decrementMealInCart(id))}
          onIncrement={() => dispatch(incrementMealInCart(id))}
        />
      </div>
      <div className={classes.actions}>
        <button
          className={classes.close}
          onClick={() => dispatch(removeMealFromCart(id))}
        />
        <div className={classes.price}>{price * count}$</div>
      </div>
    </article>
  );
};
