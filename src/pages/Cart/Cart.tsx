import { useNavigate } from 'react-router-dom';
import {
  decrementMealInCart,
  incrementMealInCart,
  removeMealFromCart,
  selectCartMeals,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from '@/store';

import classes from './Cart.module.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartMeals = useAppSelector(selectCartMeals);
  const total = useAppSelector(selectCartTotal);
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <ul className={classes.grid}>
        {Object.values(cartMeals).map((meal) => (
          <li key={meal.id}>
            <div className={classes.card}>
              <img
                src={meal.img}
                alt={meal.name}
                className={classes.img}
                onClick={() => navigate(`/meal/${meal.id}`)}
              />
              <div className={classes.cardInfo}>
                <div className={classes.cardTitle}>{meal.name}</div>
                <div>
                  ${meal.price} x {meal.count} = ${meal.price * meal.count}
                </div>
                <div>
                  <button
                    onClick={() => dispatch(decrementMealInCart(meal.id))}
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(incrementMealInCart(meal.id))}
                  >
                    +
                  </button>
                  <button onClick={() => dispatch(removeMealFromCart(meal.id))}>
                    remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.total}>${total}</div>
    </div>
  );
};

export default Cart;
