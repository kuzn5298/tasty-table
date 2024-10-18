import { useEffect } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { categoryActions } from '../../../../store';
import { FetchStatus } from '../../../../constants';

import classes from './Categories.module.css';

interface CategoriesProps {
  value: string;
  onChange: (value: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.category);
  const isLoading = status === FetchStatus.Loading;

  useEffect(() => {
    if (status === FetchStatus.Idle) {
      dispatch(categoryActions.fetchCategories());
    }
  }, [status, dispatch]);

  if (isLoading) {
    return <aside>loading...</aside>;
  }

  return (
    <aside className={classes.container}>
      <div className={classes.title}>Categories</div>
      <ul className={classes.list}>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <button
              className={clsx(
                classes.card,
                category.strCategory === value && classes.active
              )}
              onClick={() => onChange(category.strCategory)}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className={classes.img}
              />
              <div className={classes.cardInfo}>{category.strCategory}</div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
