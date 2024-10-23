import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { CartIcon } from '@/components/icons';
import { AppRoute } from '@/constants';
import { selectCartCount, useAppSelector } from '@/store';

import classes from './Header.module.css';

const Header: React.FC = () => {
  const cartCount = useAppSelector(selectCartCount);
  return (
    <header className={clsx('container', classes.header)}>
      <Link to={AppRoute.Home} className={classes.logo} data-testid='logo-link'>
        TastyTable
      </Link>
      <nav className={classes.nav}>
        <Link
          to={AppRoute.Cart}
          className={classes.cart}
          data-testid='cart-link'
        >
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
