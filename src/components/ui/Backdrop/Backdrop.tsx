import { createPortal } from 'react-dom';
import clsx from 'clsx';

import classes from './Backdrop.module.css';

interface BackdropProps {
  open?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({
  open = true,
  onClick,
  className,
  children,
}) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className={clsx(classes.backdrop, className)} onClick={onClick}>
      {children}
    </div>,
    document.getElementById('root')!
  );
};
