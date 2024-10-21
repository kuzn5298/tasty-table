import { useMemo } from 'react';
import { Button, Chip, Dialog, SmallCard } from '@/components/ui';
import { Meal } from '@/types';
import { addMealToCart, useAppDispatch } from '@/store';

import classes from './MealDialog.module.css';

const getIngredientImg = (ingredient: string) =>
  `https://www.themealdb.com/images/ingredients/${ingredient}.png`;

interface MealDialogProps {
  open?: boolean;
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  meal: Meal;
}

export const MealDialog: React.FC<MealDialogProps> = ({
  open,
  onClose,
  meal,
}) => {
  const dispatch = useAppDispatch();

  const buyMeal = () => {
    dispatch(addMealToCart(meal));
    onClose?.();
  };

  const cardTags = useMemo(
    () => [meal.area, meal.category, ...meal.tags].filter(Boolean),
    [meal]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={classes.container}>
        <section className={classes['img-container']}>
          <img className={classes.img} src={meal.img} alt={meal.name} />
        </section>
        <section className={classes['info-container']}>
          <div className={classes.header}>
            <div className={classes.title}>{meal.name}</div>
            <div className={classes.tags}>
              {cardTags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
          <div className={classes.body}>
            <div className={classes.ingredients}>
              {meal.ingredients.map((ingredient) => (
                <SmallCard
                  key={ingredient}
                  title={ingredient}
                  image={getIngredientImg(ingredient)}
                />
              ))}
            </div>
          </div>
          <div>
            <Button className={classes.btn} onClick={buyMeal}>
              Buy for {meal.price}$
            </Button>
          </div>
        </section>
      </div>
    </Dialog>
  );
};
