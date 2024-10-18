import React from 'react';
import clsx from 'clsx';

import classes from './SvgIcon.module.css';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {}

export const SvgIcon: React.FC<SvgIconProps> = ({
  children = null,
  viewBox = '0 0 24 24',
  className,
  ...props
}) => (
  <svg viewBox={viewBox} className={clsx(classes.icon, className)} {...props}>
    {children}
  </svg>
);
