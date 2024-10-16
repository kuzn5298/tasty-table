import { useState } from 'react';
import { Categories, Meals } from './components';
import classes from './Menu.module.css';

const Menu = () => {
  const [category, setCategory] = useState<string>('');
  return (
    <div className={classes.container}>
      <Categories value={category} onChange={setCategory} />
      <Meals category={category} />
    </div>
  );
};

export default Menu;
