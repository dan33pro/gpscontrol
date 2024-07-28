import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import React from 'react';

import Home from '@pages/index';
import AppContext from '@context/AppContext';
import useAppState from '@hooks/useAppState';

const AppProviderWrapper = ({ children }) => {
  const appState = useAppState();
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

describe('Home Page', () => {
  it('Representa un encabezado', () => {
    render(
      <AppProviderWrapper>
        <Home />
      </AppProviderWrapper>
    );

    const heading = screen.getByText('BIENVENIDO A');
    expect(heading).toBeInTheDocument();
  });
});
