import { useMemo } from 'react';
import { CardGrid } from './CardGrid';
import { CardSkeleton } from '../Card';

export interface CardGridSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
}

export const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({
  length = 20,
  ...props
}) => {
  const cards = useMemo(
    () => new Array(length).fill(null).map((_, i) => i),
    [length]
  );

  return (
    <CardGrid {...props}>
      {cards.map((key) => (
        <CardSkeleton key={key} />
      ))}
    </CardGrid>
  );
};
