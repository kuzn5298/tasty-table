import { useNavigate } from 'react-router-dom';
import {
  cartActions,
  selectTotal,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import classes from './Cart.module.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.cart.meals);
  const total = useAppSelector(selectTotal);
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <ul className={classes.grid}>
        {meals?.map((meal) => (
          <li key={meal.idMeal}>
            <div className={classes.card}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className={classes.img}
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
              />
              <div className={classes.cardInfo}>
                <div className={classes.cardTitle}>{meal.strMeal}</div>
                <div>
                  ${meal.price} x {meal.count} = ${meal.price * meal.count}
                </div>
                <div>
                  <button
                    onClick={() =>
                      dispatch(cartActions.decrementMeal(meal.idMeal))
                    }
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      dispatch(cartActions.incrementMeal(meal.idMeal))
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch(cartActions.removeMeal(meal.idMeal))
                    }
                  >
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
