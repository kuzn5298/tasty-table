import clsx from 'clsx';
import classes from './Spinner.module.css';

interface SpinnerProps {
  fullContainer?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ fullContainer }) => (
  <div className={clsx(fullContainer && classes.fullContainer)}>
    <span className={classes.loading} />
  </div>
);
