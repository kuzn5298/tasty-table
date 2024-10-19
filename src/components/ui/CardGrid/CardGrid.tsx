import clsx from 'clsx';
import classes from './CardGrid.module.css';

export type CardGridProps = React.HTMLAttributes<HTMLDivElement>;

export const CardGrid: React.FC<CardGridProps> = ({ className, ...props }) => (
  <div className={clsx(classes.grid, className)} {...props} />
);
