import clsx from 'clsx';
import classes from './Input.module.css';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={clsx(classes.input, className)} {...props} />;
};
