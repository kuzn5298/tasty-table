import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearMealsFromCart,
  selectCartMeals,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { Button } from '@/components/ui';
import { AppRoute } from '@/constants';
import { CartCard } from './components';

import classes from './Cart.module.css';

const DELIVERY_PRICE = 8;
const SUCCESS_MESSAGE =
  'Thank you for using our test application. We do not process real orders, but you have successfully completed the checkout process! 😊';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const meals = useAppSelector(selectCartMeals);
  const total = useAppSelector(selectCartTotal);
  const mealsArr = useMemo(() => Object.values(meals), [meals]);

  const confirmHandler = () => {
    dispatch(clearMealsFromCart());
    alert(SUCCESS_MESSAGE);
  };

  if (!mealsArr.length) {
    return (
      <div className={classes['empty-container']}>
        <div className={classes['empty-title']}>Your cart is empty! 🛒</div>
        <div>
          It looks like you haven't added any items yet. Start exploring our
          menu and fill your cart with delicious dishes!
        </div>
        <Button onClick={() => navigate(AppRoute.Home)}>Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <section className={classes['order-section']}>
        <div className={classes['order-cards']}>
          {mealsArr.map((meal) => (
            <CartCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>
      <section className={classes['total-section']}>
        <div>
          <span>Order amount:</span>
          <span>{total}$</span>
        </div>
        <div>
          <span>Delivery amount:</span>
          <span>{DELIVERY_PRICE}$</span>
        </div>
        <div>
          <span>Total order amount:</span>
          <span>{total + DELIVERY_PRICE}$</span>
        </div>
      </section>
      <section className={classes['confirm-section']}>
        <Button onClick={confirmHandler}>Confirm</Button>
      </section>
    </div>
  );
};

export default Cart;
