import clsx from 'clsx';
import classes from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  price: string;
  action: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  action,
  onClick,
  ...props
}) => {
  return (
    <article
      className={clsx(classes.card, Boolean(onClick) && classes['card-hover'])}
      onClick={onClick}
      {...props}
    >
      <img src={image} alt={title} className={classes.img} />
      <div className={classes.title}>{title}</div>
      <div className={classes.footer}>
        <div className={classes.price}>{price}</div>
        <div onClick={(e) => e.stopPropagation()}>{action}</div>
      </div>
    </article>
  );
};
