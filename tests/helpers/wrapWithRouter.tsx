import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid='location-display'>{location.pathname}</div>;
};

export const wrapWithRouter = (
  children: React.ReactNode,
  route: string = '/'
) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={route} element={children} />
        <Route path='*' element={null} />
      </Routes>
      <LocationDisplay />
    </MemoryRouter>
  );
};
