import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { CartIcon } from '@/components/icons';
import { AppRoute } from '@/constants';
import { selectCount, useAppSelector } from '@/store';

import classes from './Header.module.css';

const Header = () => {
  const cartCount = useAppSelector(selectCount);
  return (
    <header className={clsx('container', classes.header)}>
      <Link to={AppRoute.Home} className={classes.logo}>
        TastyTable
      </Link>
      <nav className={classes.nav}>
        <Link to={AppRoute.Cart} className={classes.cart}>
          <CartIcon />
          {Boolean(cartCount) && (
            <span className={classes.cartBadge}>{cartCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
