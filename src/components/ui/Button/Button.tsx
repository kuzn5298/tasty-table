import clsx from 'clsx';
import classes from './Button.module.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={clsx(classes.button, className)} {...props} />;
};
