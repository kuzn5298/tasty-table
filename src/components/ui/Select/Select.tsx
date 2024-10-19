import clsx from 'clsx';

import classes from './Select.module.css';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  className,
  children,
  placeholder,
  ...props
}) => {
  return (
    <span className={clsx(classes.select, className)}>
      <select {...props}>
        {placeholder && (
          <option value={undefined} disabled selected>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </span>
  );
};
