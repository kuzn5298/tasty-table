import { PropsWithChildren } from 'react';

import classes from './Chip.module.css';

export const Chip: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className={classes.chip}>{children}</span>;
};
