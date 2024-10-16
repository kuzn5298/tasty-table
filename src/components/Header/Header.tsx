import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../store';

import classes from './Header.module.css';

const Header = () => {
  const meals = useAppSelector((state) => state.cart.meals);
  return (
    <header className={classes.header}>
      <Link to={AppRoute.Home} className={classes.logo}>
        Tasty Table
      </Link>
      <nav className={classes.nav}>
        <Link to={AppRoute.Cart}>Cart ({meals.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
