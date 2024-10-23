import { rootReducer } from './rootReducer';
import { setupStore } from './store';

export * from './slices/cart/cartTypes';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
