import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  cartActions,
  mealActions,
  useAppDispatch,
  useAppSelector,
} from '../../../../store';
import { FetchStatus } from '../../../../constants';
import { ShortMeal } from '../../../../types';

import classes from './Meals.module.css';

interface MealsProps {
  category: string;
}

const Meals: React.FC<MealsProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { meals, status } = useAppSelector((state) => state.meal);
  const isLoading = status[category] === FetchStatus.Loading;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      category &&
      (status[category] === FetchStatus.Idle || status[category] === undefined)
    ) {
      dispatch(mealActions.fetchMealsByCategory(category));
    }
  }, [status, category]);

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

  return (
    <div className={classes.container}>
      <ul className={classes.grid}>
        {meals[category]?.map((meal) => (
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
                <div>$10.5</div>
                <button onClick={() => addToCart(meal)}>add</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meals;
