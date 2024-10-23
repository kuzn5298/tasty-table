import React from 'react';
import { Provider } from 'react-redux';
import { AppStore } from '../../src/store';

export const wrapWithStore = (children: React.ReactNode, store: AppStore) => {
  return <Provider store={store}>{children}</Provider>;
};
