import clsx from 'clsx';

import classes from './Card.module.css';

export interface SmallCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
}

export const SmallCard: React.FC<SmallCardProps> = ({
  image,
  title,
  ...props
}) => {
  return (
    <article className={clsx(classes['small-card'])} {...props}>
      <img src={image} alt={title} className={classes['small-img']} />
      <div className={classes['small-title']}>{title}</div>
    </article>
  );
};
