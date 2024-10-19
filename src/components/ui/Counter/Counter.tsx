import clsx from 'clsx';
import classes from './Counter.module.css';

export interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  onIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Counter: React.FC<CounterProps> = ({
  count,
  onIncrement,
  onDecrement,
  className,
  ...props
}) => {
  return (
    <div className={clsx(classes.counter, className)} {...props}>
      <button className={classes.button} onClick={onDecrement}>
        -
      </button>
      <span>{count}</span>
      <button className={classes.button} onClick={onIncrement}>
        +
      </button>
    </div>
  );
};
