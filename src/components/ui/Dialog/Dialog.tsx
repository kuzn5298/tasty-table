import clsx from 'clsx';
import { Backdrop } from '../Backdrop';

import classes from './Dialog.module.css';

interface DialogProps {
  open?: boolean;
  className?: string;
  children: React.ReactNode;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Dialog: React.FC<DialogProps> = ({
  open = true,
  children,
  className,
  onClose,
}) => (
  <Backdrop open={open}>
    <div className={clsx(classes.dialog, className)}>
      <div className={classes.container}>{children}</div>
      {onClose && <button className={classes.close} onClick={onClose} />}
    </div>
  </Backdrop>
);
