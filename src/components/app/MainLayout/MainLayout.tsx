import { Suspense } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

import classes from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={clsx('container', classes.main)}>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
