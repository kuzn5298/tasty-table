import clsx from 'clsx';
import classes from './Card.module.css';

export type CardSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <article
      className={clsx(classes.card, classes['card-skeleton'], className)}
      {...props}
    >
      <div className={clsx(classes.img, classes['img-skeleton'])} />
      <div className={clsx(classes.title, classes['title-skeleton'])} />
      <div className={classes.footer}>
        <div className={clsx(classes['footer-skeleton'])} />
        <div className={clsx(classes['footer-skeleton'])} />
      </div>
    </article>
  );
};
