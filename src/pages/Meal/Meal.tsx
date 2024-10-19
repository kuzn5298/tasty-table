import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Meal as MealType } from '../../types';
import { getMealById } from '../../services/mealsService';
import { AppRoute } from '../../constants';

const Meal = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<MealType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const { data, status } = await getMealById(id);
        if (status >= 200 && status < 300 && data) {
          setMeal(data);
        }
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!meal) {
    return <Navigate to={AppRoute.Home} />;
  }

  return <div>{meal?.name}</div>;
};

export default Meal;
