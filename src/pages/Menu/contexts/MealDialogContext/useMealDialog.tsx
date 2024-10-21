import { useContext } from 'react';
import { MealDialogContext } from './MealDialogContext';

export const useMealDialog = () => useContext(MealDialogContext);
