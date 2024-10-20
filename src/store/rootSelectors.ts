import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './rootTypes';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export * from './slices/cart/cartSelectors';
