import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Backdrop, Spinner } from '@/components/ui';
import { mealsService } from '@/services';
import { MealDialog } from '../../components';

interface MealDialogContextValue {
  openMealDialog: (id: string) => void;
  closeMealDialog: () => void;
}

interface MealDialogProviderProps {
  children: React.ReactNode;
}

const INIT_CONTEXT_DATA = {} as MealDialogContextValue;

export const MealDialogContext =
  createContext<MealDialogContextValue>(INIT_CONTEXT_DATA);

export const MealDialogProvider: React.FC<MealDialogProviderProps> = ({
  children,
}) => {
  const [mealId, setMealId] = useState<string | null>(null);

  const { data: { data: meal } = {}, isLoading } = useQuery({
    queryKey: ['getMealById', mealId],
    queryFn: () => mealsService.getMealById(mealId as string),
    enabled: !!mealId,
  });

  const openMealDialog = useCallback((id: string) => {
    setMealId(id);
  }, []);

  const closeMealDialog = useCallback(() => {
    setMealId(null);
  }, []);

  const contextValue = useMemo<MealDialogContextValue>(
    () => ({ openMealDialog, closeMealDialog }),
    [openMealDialog, closeMealDialog]
  );

  return (
    <MealDialogContext.Provider value={contextValue}>
      {children}
      {!!meal && <MealDialog open onClose={closeMealDialog} meal={meal} />}
      <Backdrop open={isLoading}>
        <Spinner />
      </Backdrop>
    </MealDialogContext.Provider>
  );
};
